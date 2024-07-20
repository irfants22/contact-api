import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  createAddressValidation,
  getAddressValidation,
  updateAddressValidation,
} from "../validation/address-validation.js";
import { getContactValidation } from "../validation/contact-validation.js";
import { validate } from "../validation/validation.js";

const checkContactMustExist = async (user, contactId) => {
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

  return contactId;
};

const listAddress = async (user, contactId) => {
  contactId = await checkContactMustExist(user, contactId);

  return prismaClient.address.findMany({
    where: {
      contact_id: contactId,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });
};

const getAddress = async (user, contactId, addressId) => {
  contactId = await checkContactMustExist(user, contactId);

  addressId = validate(getAddressValidation, addressId);

  const isAddressExist = await prismaClient.address.count({
    where: {
      id: addressId,
      contact_id: contactId,
    },
  });

  if (isAddressExist !== 1) {
    throw new ResponseError(400, "Address is not found");
  }

  return prismaClient.address.findFirst({
    where: {
      id: addressId,
      contact_id: contactId,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });
};

const createAddress = async (user, contactId, request) => {
  contactId = await checkContactMustExist(user, contactId);

  request = validate(createAddressValidation, request);
  request.contact_id = contactId;

  return prismaClient.address.create({
    data: request,
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });
};

const updateAddress = async (user, contactId, request) => {
  contactId = await checkContactMustExist(user, contactId);

  const address = validate(updateAddressValidation, request);

  const isAddressExist = await prismaClient.address.count({
    where: {
      id: address.id,
      contact_id: contactId,
    },
  });

  if (isAddressExist !== 1) {
    throw new ResponseError(404, "Address is not found");
  }

  return prismaClient.address.update({
    where: {
      id: address.id,
    },
    data: {
      street: address.street,
      city: address.city,
      province: address.province,
      country: address.country,
      postal_code: address.postal_code,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });
};

const removeAddress = async (user, contactId, addressId) => {
  contactId = await checkContactMustExist(user, contactId);

  addressId = validate(getAddressValidation, addressId);

  const isAddressExist = await prismaClient.address.count({
    where: {
      id: addressId,
      contact_id: contactId,
    },
  });

  if (isAddressExist !== 1) {
    throw new ResponseError(400, "Address is not found");
  }

  return prismaClient.address.delete({
    where: {
      id: addressId,
    },
  });
};

export default {
  listAddress,
  getAddress,
  createAddress,
  updateAddress,
  removeAddress,
};
