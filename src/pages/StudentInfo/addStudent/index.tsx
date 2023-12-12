import { ChangeEvent, useState, useEffect, MouseEvent } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  Theme,
} from "@mui/material";
import DialogModal from "@components/DialogModal";
import LoadingButton from "@components/LoadingButton";
import AlertComponent from "@components/Alert";
import PersonalInfoForm from "./PersonalInfoForm";
import GuardianInfoForm from "./GuardianInfoForm";
import PasswordForm from "./PasswordForm";
import GovermentIdForm from "./GovermentIdForm";

import useAlert from "@src/hooks/useAlert";
import {
  validateText,
  validateEmail,
  validatePhone,
  validatePassword,
  getHelperText,
  validateError,
} from "@src/utils/validation";
import { AddStudentStateType } from "@ts/types";
import { checkEmailExists, getLocalStorage } from "@utils/index";
import { STEPPER_FORM_STEPS_NAME } from "@constant/index.ts";

type AddStudentPropsType = {
  handleClose: () => void;
  handleSubmit: (studentInfo: AddStudentStateType) => void;
};

const stepComponents = [
  PersonalInfoForm,
  GuardianInfoForm,
  PasswordForm,
  GovermentIdForm,
];

const isNextButtonDisabled = (
  activeStep: number,
  student: AddStudentStateType
): boolean => {
  switch (activeStep) {
    case 0:
      return (
        validateText(student.studentName) &&
        validateEmail(student.email) &&
        validatePhone(student.mobileNumber)
      );
    case 1:
      return (
        validateText(student.guardianName) &&
        validatePhone(student.guardianPhoneNumber) &&
        student.address !== ""
      );
    case 2:
      return (
        validatePassword(student.password) &&
        validatePassword(student.confirmPassword) &&
        student.password === student.confirmPassword
      );
    case 3:
      return student.govId !== "" && student.govIdImage !== "";

    default:
      return false;
  }
};

const AddStudent = ({ handleClose, handleSubmit }: AddStudentPropsType) => {
  const [student, setStudent] = useState<AddStudentStateType>({
    studentName: "",
    roomNumber: null,
    mobileNumber: "",
    guardianName: "",
    guardianPhoneNumber: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
    govId: "",
    govIdImage: "",
  });
  const [activeStep, setActiveStep] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const { alert, handleAlert } = useAlert();
  const ActiveComponent = stepComponents[activeStep];
  const { email } = student;
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  useEffect(() => {
    const storedStudentInfo = getLocalStorage("studentInfo");
    if (storedStudentInfo) {
      setStudent(JSON.parse(storedStudentInfo));
    }
  }, []);
  useEffect(() => {
    const isDisabled = !isNextButtonDisabled(activeStep, student);
    setIsDisabled(isDisabled);
  }, [student, activeStep]);

  const handleChange = ({
    target: { name, value, files, type },
  }: ChangeEvent<HTMLInputElement>) => {
    if (type === "file" && files) {
      const file = files![0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setStudent((student) => {
          return {
            ...student,
            govIdImage: base64String,
          };
        });
      };
      reader.readAsDataURL(file);
    } else {
      setStudent((student) => {
        return {
          ...student,
          [name]: value,
        };
      });
    }
  };

  const handleClick = ({
    currentTarget: { innerText },
  }: MouseEvent<HTMLDivElement>) => {
    setStudent((student) => {
      return {
        ...student,
        govId: innerText,
      };
    });
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      try {
        const emailExists = await checkEmailExists(email);
        if (emailExists) {
          handleAlert(true, "Email already exists", "error");
          return;
        }
      } catch (err) {
        handleAlert(true, "Something went wrong", "error");
        return;
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleSaveAndClose = () => {
    localStorage.setItem("studentInfo", JSON.stringify(student));
    handleClose();
  };

  const actions = (
    <>
      <Button
        disabled={activeStep === 0}
        onClick={handleBack}
        variant="outlined"
        size="large"
      >
        Back
      </Button>
      {activeStep === STEPPER_FORM_STEPS_NAME.length - 1 ? (
        <LoadingButton
          buttonText="Submit"
          onSubmit={() => handleSubmit(student)}
          disabled={isDisabled}
        />
      ) : (
        <Button
          onClick={handleNext}
          disabled={isDisabled}
          variant="contained"
          size="large"
        >
          Next
        </Button>
      )}
    </>
  );

  return (
    <DialogModal
      isOpen={true}
      title="Add Student"
      handleClose={handleSaveAndClose}
      dialogSize="md"
      actions={actions}
      className="h-[70vh] w-[800px]"
    >
      <Grid container spacing={1} className="h-full">
        <Grid item xs={12} md={3}>
          <Box className="h-full">
            <Stepper
              activeStep={activeStep}
              orientation={isSmallScreen ? "horizontal" : "vertical"}
              className="flex-row mb-2 md:mb-0 md:flex-col"
            >
              {STEPPER_FORM_STEPS_NAME.map((label) => {
                return (
                  <Step key={label}>
                    <StepLabel
                      sx={{
                        "& .MuiStepLabel-label": {
                          display: { xs: "none", sm: "block" },
                        },
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Box>
        </Grid>
        <Grid item xs={12} md={9} className="md:h-full">
          <Typography variant="h6" className="font-semibold">
            {STEPPER_FORM_STEPS_NAME[activeStep]}
          </Typography>
          <ActiveComponent
            student={student}
            validateError={validateError}
            getHelperText={getHelperText}
            handleChange={handleChange}
            handleClick={handleClick}
          />
        </Grid>
      </Grid>
      {alert.isOpen && (
        <AlertComponent
          severity={alert.severity}
          message={alert.message}
          handleClose={() => handleAlert(false)}
        />
      )}
    </DialogModal>
  );
};

export default AddStudent;
