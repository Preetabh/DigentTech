const mongoose = require('mongoose');
const Contact = require('../models/contactModel');
const {
  sendContactNotificationToAdmin,
  sendContactAutoReply,
} = require('../services/emailService');

// Simple regex for email validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * @desc    Submit a contact inquiry form with Dual Mail System:
 *          1. HR Query Report to hr.digenttech@gmail.com
 *          2. User Thank You receipt to user email
 * @route   POST /api/contact
 * @access  Public
 */
const submitContact = async (req, res, next) => {
  try {
    const { name, email, service, budget, message } = req.body;

    // Validate inputs
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Name is required.',
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required.',
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    if (!EMAIL_REGEX.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Project brief / message is required.',
      });
    }

    const cleanName = name.trim();
    const cleanService = (service || 'Web development').trim();
    const cleanBudget = (budget || "Let's discuss").trim();
    const cleanMessage = message.trim();

    // Client metadata
    const ipAddress =
      req.headers['x-forwarded-for'] ||
      req.socket.remoteAddress ||
      '';
    const userAgent = req.headers['user-agent'] || '';

    // Check if MongoDB is connected
    const isDbConnected = mongoose.connection.readyState === 1;
    let savedContact = null;

    if (isDbConnected) {
      try {
        savedContact = await Contact.create({
          name: cleanName,
          email: cleanEmail,
          service: cleanService,
          budget: cleanBudget,
          message: cleanMessage,
          ipAddress: String(ipAddress),
          userAgent: String(userAgent),
        });
      } catch (dbErr) {
        console.warn('⚠️ Could not save contact to MongoDB:', dbErr.message);
      }
    } else {
      console.warn('ℹ️ MongoDB is disconnected; skipping DB write and delivering via Brevo HTTP API directly.');
    }

    const inquiryId = savedContact ? savedContact._id.toString() : null;

    console.log(`📨 Initiating Dual Mail System for query from ${cleanName} (${cleanEmail})...`);

    // Dual Mail System:
    // 1. Report to HR: hr.digenttech@gmail.com
    // 2. Thank You acknowledgment to User: cleanEmail
    const [adminMailOutcome, userMailOutcome] = await Promise.allSettled([
      sendContactNotificationToAdmin({
        name: cleanName,
        email: cleanEmail,
        service: cleanService,
        budget: cleanBudget,
        message: cleanMessage,
        inquiryId,
      }),
      sendContactAutoReply({
        name: cleanName,
        email: cleanEmail,
        service: cleanService,
      }),
    ]);

    const adminEmailSuccess = adminMailOutcome.status === 'fulfilled';
    const userEmailSuccess = userMailOutcome.status === 'fulfilled';

    if (adminEmailSuccess) {
      console.log(`✅ [Mail 1/2] Query Report sent to HR (hr.digenttech@gmail.com). Message ID: ${adminMailOutcome.value?.messageId}`);
    } else {
      console.error(`❌ [Mail 1/2] Error sending Query Report to HR:`, adminMailOutcome.reason?.message);
    }

    if (userEmailSuccess) {
      console.log(`✅ [Mail 2/2] Thank You email sent to User (${cleanEmail}). Message ID: ${userMailOutcome.value?.messageId}`);
    } else {
      console.warn(`⚠️ [Mail 2/2] User Thank You email issue:`, userMailOutcome.reason?.message);
    }

    // Update contact record if DB was used
    if (savedContact) {
      if (adminEmailSuccess) {
        savedContact.emailSent = true;
        savedContact.emailMessageId = adminMailOutcome.value?.messageId;
      }
      if (userEmailSuccess) {
        savedContact.autoReplySent = true;
      }
      await savedContact.save().catch(() => {});
    }

    // If both DB save failed and HR report failed, return server error
    if (!savedContact && !adminEmailSuccess) {
      return res.status(500).json({
        success: false,
        message: `Failed to deliver query to HR: ${adminMailOutcome.reason?.message || 'Email delivery failed'}`,
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your project inquiry has been received. Our team will contact you shortly.',
      data: {
        id: inquiryId,
        name: cleanName,
        email: cleanEmail,
        service: cleanService,
        dualMailSystem: {
          hrReportDelivered: adminEmailSuccess,
          userThankYouDelivered: userEmailSuccess,
          hrRecipient: 'hr.digenttech@gmail.com',
          userRecipient: cleanEmail,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all contact inquiries
 * @route   GET /api/contact
 * @access  Private / Public
 */
const getContacts = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database is currently unavailable.',
      });
    }

    const { status, limit = 50, page = 1 } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const total = await Contact.countDocuments(filter);
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit, 10));

    res.status(200).json({
      success: true,
      count: contacts.length,
      total,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single contact inquiry by ID
 * @route   GET /api/contact/:id
 * @access  Private / Public
 */
const getContactById = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database is currently unavailable.',
      });
    }

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found',
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update contact status
 * @route   PATCH /api/contact/:id/status
 * @access  Private / Public
 */
const updateContactStatus = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database is currently unavailable.',
      });
    }

    const { status } = req.body;
    const allowedStatuses = ['new', 'in-progress', 'replied', 'closed'];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${allowedStatuses.join(', ')}`,
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found',
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContact,
  getContacts,
  getContactById,
  updateContactStatus,
};
