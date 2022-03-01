import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useStores } from "../../Providers/StoresProvider";
import getRandomNumber from "../../Helpers/Random";
import Colors from "../../Constants/Colors";
import Button from "../../Atoms/Button";
import Input from "../../Atoms/Input";

interface ICustomerForm {
  name: string;
  mobileNumber: string;
  guarantorName: string;
  guarantorMobileNumber: string;
}

const formValidationSchema = yup.object().shape({
  name: yup.string().required("Customer Name is required"),
  mobileNumber: yup
    .string()
    .matches(/^\d+$/, "Mobile Number should be numeric")
    .min(10, "Mobile Number must be 10 digits")
    .max(10, "Mobile Number must be 10 digits")
    .required("Mobile Number is required"),
  guarantorName: yup.string().required("Guarantor Name is required"),
  guarantorMobileNumber: yup
    .string()
    .matches(/^\d+$/, "Mobile Number should be numeric")
    .min(10, "Mobile Number must be 10 digits")
    .max(10, "Mobile Number must be 10 digits")
    .required("Mobile Number is required"),
});

export default function Form() {
  const { CustomersStore } = useStores();
  let initialValues: ICustomerForm = {
    name: "",
    mobileNumber: "",
    guarantorName: "",
    guarantorMobileNumber: "",
  };
  function handleOnSubmit(values: ICustomerForm) {
    CustomersStore.addCustomer({
      ...values,
      id: getRandomNumber(),
      address: "",
    });
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleOnSubmit}
      validationSchema={formValidationSchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
        setFieldTouched,
      }) => {
        return (
          <>
            <View style={styles.formCont}>
              <View style={styles.formItem}>
                <Text style={styles.label}>Customer Name</Text>
                <Input
                  placeHolder="Customer Name"
                  handleTextChange={handleChange("name")}
                  style={styles.input1}
                  onBlur={() => setFieldTouched("name")}
                />
                {touched.name && errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
              </View>

              <View style={styles.formItem}>
                <Text style={styles.label}>Customer Mobile Number</Text>
                <Input
                  placeHolder="Customer Mobile Number"
                  handleTextChange={handleChange("mobileNumber")}
                  style={styles.input1}
                  keyboard="number-pad"
                  onBlur={() => setFieldTouched("mobileNumber")}
                />
                {touched.mobileNumber && errors.mobileNumber && (
                  <Text style={styles.errorText}>{errors.mobileNumber}</Text>
                )}
              </View>

              <View style={styles.formItem}>
                <Text style={styles.label}>Guarantor Name</Text>
                <Input
                  placeHolder="Guarantor Name"
                  handleTextChange={handleChange("guarantorName")}
                  style={styles.input1}
                  onBlur={() => setFieldTouched("guarantorName")}
                />
                {touched.guarantorName && errors.guarantorName && (
                  <Text style={styles.errorText}>{errors.guarantorName}</Text>
                )}
              </View>

              <View style={styles.formItem}>
                <Text style={styles.label}>Guarantor Mobile Number</Text>
                <Input
                  placeHolder="Guarantor Mobile Number"
                  handleTextChange={handleChange("guarantorMobileNumber")}
                  style={styles.input1}
                  keyboard="number-pad"
                  onBlur={() => setFieldTouched("gaurentorMobile")}
                />
                {touched.guarantorMobileNumber &&
                  errors.guarantorMobileNumber && (
                    <Text style={styles.errorText}>
                      {errors.guarantorMobileNumber}
                    </Text>
                  )}
              </View>

              <View style={styles.buttonCont}>
                <Button
                  style={styles.button}
                  onPress={handleSubmit}
                  text="SAVE"
                ></Button>
              </View>
            </View>
          </>
        );
      }}
    </Formik>
  );
}

const styles = StyleSheet.create({
  formCont: {
    marginTop: 10,
    alignItems: "center",
    flex: 1,
  },
  formItem: {
    marginBottom: 15,
  },
  label: {
    color: Colors.secondaryGray,
    fontSize: 16,
    marginBottom: 5,
  },
  input1: {
    width: "90%",
    elevation: 5,
  },
  mobileNumberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonCont: {
    flex: 1,
    justifyContent: "flex-end",
    width: "90%",
    minHeight: 60,
  },
  button: {
    width: "100%",
    marginBottom: 10,
  },
  errorText: {
    fontSize: 10,
    color: Colors.primaryRed,
  },
});
