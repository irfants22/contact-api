import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  createContactValidation,
  getContactValidation,
  searchContactValidation,
  updateContactValidation,
} from "../validation/contact-validation.js";
import { validate } from "../validation/validation.js";

const getContact = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);

  const contact = await prismaClient.contact.findFirst({
    where: {
      id: contactId,
      username: user.username,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });

  if (!contact) {
    throw new ResponseError(404, "Contact is not found");
  }

  return contact;
};

const createContact = async (user, request) => {
  const contact = validate(createContactValidation, request);
  contact.username = user.username;

  return prismaClient.contact.create({
    data: contact,
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });
};

const updateContact = async (user, request) => {
  const contact = validate(updateContactValidation, request);

  const isContactExist = await prismaClient.contact.count({
    where: {
      id: contact.id,
      username: user.username,
    },
  });

  if (isContactExist !== 1) {
    throw new ResponseError(404, "Contact is not found");
  }

  return prismaClient.contact.update({
    where: {
      id: contact.id,
    },
    data: {
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });
};

const removeContact = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);

  const isContactExist = await prismaClient.contact.count({
    where: {
      id: contactId,
      username: user.username,
    },
  });

  if (isContactExist !== 1) {
    throw new ResponseError(404, "Contact is not found");
  }

  return prismaClient.contact.delete({
    where: {
      id: contactId,
    },
  });
};

const searchContact = async (user, request) => {
  request = validate(searchContactValidation, request);

  const filters = [];

  if (request.name) {
    filters.push({
      OR: [
        {
          first_name: {
            contains: request.name,
          },
        },
        {
          last_name: {
            contains: request.name,
          },
        },
      ],
    });
  }
  if (request.email) {
    filters.push({
      email: {
        contains: request.email,
      },
    });
  }
  if (request.phone) {
    filters.push({
      phone: {
        contains: request.phone,
      },
    });
  }

  const skipItem = (request.page - 1) * request.size;

  const contacts = await prismaClient.contact.findMany({
    where: {
      AND: [...filters, { username: user.username }],
    },
    take: request.size,
    skip: skipItem,
  });

  const totalItems = await prismaClient.contact.count({
    where: {
      AND: [...filters, { username: user.username }],
    },
  });

  return {
    data: contacts,
    paging: {
      page: request.page,
      total_page: Math.ceil(totalItems / request.size),
      total_item: totalItems,
    },
  };
};

export default {
  getContact,
  createContact,
  updateContact,
  removeContact,
  searchContact,
};
