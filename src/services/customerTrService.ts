import { customerData } from "@/types/customerTrTypes";

import { axiosConfig } from "@/utils/axiosConfig";

const resolver = axiosConfig();

export function getAllCustomer() {
  return resolver
    .get("/api/customer")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

export function addCustomer(body: customerData) {
  return resolver
    .post("/api/customer", body)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

export function getCustomerById(id: number) {
  return resolver
    .get(`/api/customer/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

export function updateCustomerById(id: number, body: customerData) {
  return resolver
    .put(`/api/customer/${id}`, body)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

export function deleteCustomer(id: number) {
  return resolver
    .delete(`/api/customer/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}

export function deleteCustomerBulk(idArr: number[]) {
  return resolver
    .post("/api/customer/bulk", {
      id: idArr,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
}
