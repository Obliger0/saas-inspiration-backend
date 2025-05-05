const prisma = require('../config/prismaClient');
const puppeteerService = require('../services/puppeteerService');
const { createSlug } = require('../utils/slugify');

// POST /api/inspirations/extract-links
const extractLinks = async (req, res, next) => {
  try {
    const { url } = req.body;
    const links = await puppeteerService.extractInternalLinks(url);
    res.json({ links });
  } catch (error) {
    next(error);
  }
};

// POST /api/inspirations
const addInspirations = async (req, res, next) => {
  try {
    const { urls } = req.body;
    const addedInspirations = [];

    for (const url of urls) {
      const data = await puppeteerService.extractPageDetails(url);

      const inspiration = await prisma.inspiration.create({
        data: {
          title: data.title,
          description: data.description,
          websiteLink: url,
          desktopScreenshotUrl: data.desktopScreenshotUrl,
          mobileScreenshotUrl: data.mobileScreenshotUrl,
          colorScheme: data.colorScheme,
          fonts: data.fonts,
          technologyStack: data.technologyStack,
          categories: data.categories,
          niche: data.niche,
          slug: createSlug(data.title),
          metaTitle: data.metaTitle,
          metaDescription: data.metaDescription,
        },
      });

      addedInspirations.push(inspiration);
    }

    res.status(201).json({ addedInspirations });
  } catch (error) {
    next(error);
  }
};

// GET /api/inspirations
const getInspirations = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const inspirations = await prisma.inspiration.findMany({
      skip: (page - 1) * limit,
      take: parseInt(limit),
    });
    res.json({ inspirations });
  } catch (error) {
    next(error);
  }
};

// GET /api/inspirations/:slug
const getInspirationBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const inspiration = await prisma.inspiration.update({
      where: { slug },
      data: {
        pageViews: { increment: 1 }
      }
    });

    res.json({ inspiration });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  extractLinks,
  addInspirations,
  getInspirations,
  getInspirationBySlug,
};
