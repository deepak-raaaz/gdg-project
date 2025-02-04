"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import CustomInput from "./CustomInput";
import CustomSelector from "./CustomSelector";
import CustomMultiSelector from "./CustomMultiSelector";
import {
  getStep3Schema,
  step1Schema,
  step2Schema,
  step4Schema,
} from "./schema";
import CustomTextArea from "./CustomTextArea";

const Page = () => {
  const [step, setStep] = useState(1);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);

  const formik = useFormik({
    initialValues: {
      // Step 1
      fullName: "",
      email: "",
      phoneNumber: "",
      rollNumber: "",
      branch: "",
      branchYear: "",
      positions: [],

      // Step 2
      perspective: "",
      eventIdeas: "",

      // Step 3
      webDeveloper: {
        technologies: "",
        projects: "",
        learning: "",
        featureSuggestion: "",
      },
      appDeveloper: {
        technologies: "",
        projects: "",
        learning: "",
        featureSuggestion: "",
      },
      publicRelations: {
        mockPost: "",
        experience: "",
        preferredPlatforms: "",
      },
      videoEditor: {
        tools: "",
        videoLink: "",
        motionGraphics: "",
      },
      contentWriter: {
        hasWrittenBefore: "",
      },
      graphicsDesigner: {
        designTools: "",
        portfolioLink: "",
        socialMediaDesign: "",
        eventPosterConcept: "",
      },
      photographer: {
        photographyType: "",
        eventExperience: "",
        photographyPortfolio: "",
        cameraModel: "",
      },

      // Step 4
      linkedIn: "",
      portfolio: "",
      previousClubs: "",
      timeCommitment: "",
      reasonToJoin: "",
    },
    validationSchema:
      step === 1
        ? step1Schema
        : step === 2
        ? step2Schema
        : step === 3
        ? getStep3Schema(selectedPositions)
        : step4Schema,
    onSubmit: async (values) => {
      console.log("Submitted Data:", values);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit, setFieldValue } =
    formik;

  const handleNext = async () => {
    // Trigger form validation for the current step
    const isValid = await formik.validateForm();

    // Check if the current form is valid before proceeding
    console.log(Object.keys(isValid).length === 0);
    if (Object.keys(isValid).length === 0) {
      // If the form is valid, proceed to the next step
      if (step < 4) {
        setStep(step + 1);
      }
    } else {
      // If the form is not valid, show the validation errors
      formik.setTouched({
        ...formik.touched,
        ...Object.keys(isValid).reduce(
          (acc: { [key: string]: boolean }, key) => {
            acc[key] = true;
            return acc;
          },
          {}
        ),
      });
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen w-full relative">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto shadow-lg rounded-lg border border-slate-200 dark:border-white/10 dark:bg-black/20 bg-slate-300  backdrop-filter backdrop-blur-lg bg-opacity-10  backdrop-saturate-100 backdrop-contrast-100 bg-blend-overlay dark:bg-blend-normal">
          <div className="p-6 md:p-8">
            {/* Heading and descriptions */}
            <div className="flex justify-between items-center mb-8">
              <div className="space-y-1">
                <h1 className="text-3xl max-md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  GDG HIT Recruitment
                </h1>
                <div className="flex space-x-2 my-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-2 rounded-full transition-all  ${
                        i === step
                          ? "w-8 bg-blue-500"
                          : "w-4 bg-gray-300 dark:bg-gray-600"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-300 text-nowrap ms-4">
                Step {step} of 4
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <>
                  <div className="grid grid-cols-2 max-md:grid-cols-1 max-md:gap-0 gap-5">
                    <CustomInput
                      label="Full Name"
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      handleChange={handleChange}
                      value={values.fullName}
                      error={errors.fullName}
                      touched={touched.fullName}
                    />

                    <CustomInput
                      label="Email"
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      handleChange={handleChange}
                      value={values.email}
                      error={errors.email}
                      touched={touched.email}
                    />
                  </div>

                  <div className="grid max-md:grid-cols-1 max-md:gap-0 gap-5">
                    <CustomInput
                      label="Phone Number"
                      id="phoneNumber"
                      type="number"
                      placeholder="Enter your phone number"
                      handleChange={handleChange}
                      value={values.phoneNumber}
                      error={errors.phoneNumber}
                      touched={touched.phoneNumber}
                    />

                    <CustomInput
                      label="Roll Number"
                      id="rollNumber"
                      type="number"
                      placeholder="Enter your class roll no."
                      handleChange={handleChange}
                      value={values.rollNumber}
                      error={errors.rollNumber}
                      touched={touched.rollNumber}
                    />
                  </div>

                  <div className="grid max-md:grid-cols-1 max-md:gap-0 gap-5">
                    <CustomSelector
                      id="branch"
                      label="Branch"
                      value={values.branch}
                      error={errors.branch}
                      touched={touched.branch}
                      setFieldValue={setFieldValue}
                      list={["Computer Science", "Mechanical", "Electrical"]}
                    />

                    <CustomSelector
                      id="branchYear"
                      label="Year"
                      value={values.branchYear}
                      error={errors.branchYear}
                      touched={touched.branchYear}
                      setFieldValue={setFieldValue}
                      list={["1st Year", "2nd Year", "3rd Year", "4th Year"]}
                    />
                  </div>

                  <CustomMultiSelector
                    id="positions"
                    label="Positions"
                    value={values.positions}
                    error={errors.positions}
                    touched={touched.positions}
                    setFieldValue={(field, value) => {
                      setFieldValue(field, value);
                      setSelectedPositions(value);
                    }}
                    list={[
                      { label: "Web Developer", value: "webDeveloper" },
                      { label: "App Developer", value: "appDeveloper" },
                      { label: "Public Relations", value: "publicRelations" },
                      { label: "Graphics Designer", value: "graphicsDesigner" },
                      { label: "Video Editor", value: "videoEditor" },
                      { label: "Content Writer", value: "contentWriter" },
                      { label: "Photographer", value: "photographer" },
                    ]}
                  />
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-slate-700 dark:from-gray-400  to-slate-400 dark:to-gray-300 bg-clip-text text-transparent">
                    Perspective on GDG HIT
                  </h2>
                  <CustomTextArea
                    label="What do you think GDG HIT stands for? How does it benefit students?"
                    id="perspective"
                    placeholder=""
                    handleChange={handleChange}
                    value={values.perspective}
                    error={errors.perspective}
                    touched={touched.perspective}
                    rows={4}
                  />

                  <CustomTextArea
                    label="What kind of events or initiatives would you like to see?"
                    id="eventIdeas"
                    placeholder=""
                    handleChange={handleChange}
                    value={values.eventIdeas}
                    error={errors.eventIdeas}
                    touched={touched.eventIdeas}
                    rows={4}
                  />
                </>
              )}

              {step === 3 && (
                <>
                  <h2 className="text-xl mb-3 font-bold bg-gradient-to-r from-slate-700 dark:from-gray-400  to-slate-400 dark:to-gray-300 bg-clip-text text-transparent">
                    Role-Specific Questions
                  </h2>
                  {selectedPositions.includes("webDeveloper") && (
                    <>
                      <h2 className="text-lg font-bold bg-gradient-to-r from-slate-700 dark:from-gray-400  to-slate-400 dark:to-gray-300 bg-clip-text text-transparent">
                        Web Developer
                      </h2>
                      <CustomTextArea
                        label="What languages and tools do you use for web development?"
                        id="webDeveloper.technologies"
                        placeholder="eg.: HTML, CSS, JavaScript, React, Nodejs"
                        handleChange={handleChange}
                        value={values.webDeveloper.technologies}
                        error={errors.webDeveloper?.technologies}
                        touched={touched.webDeveloper?.technologies}
                        rows={2}
                      />

                      <CustomTextArea
                        label="Have you created any personal websites or projects?"
                        id="webDeveloper.projects"
                        placeholder="Please share links if available"
                        handleChange={handleChange}
                        value={values.webDeveloper.projects}
                        error={errors.webDeveloper?.projects}
                        touched={touched.webDeveloper?.projects}
                        rows={2}
                      />
                      <CustomTextArea
                        label="What’s a concept or tool you’re currently learning?"
                        id="webDeveloper.learning"
                        placeholder="Share what you are currently learing about"
                        handleChange={handleChange}
                        value={values.webDeveloper.learning}
                        error={errors.webDeveloper?.learning}
                        touched={touched.webDeveloper?.learning}
                        rows={2}
                      />

                      <CustomTextArea
                        label="If you had the chance, what feature would you add to the GDG HIT website?"
                        id="webDeveloper.featureSuggestion"
                        placeholder="Share your creative ideas"
                        handleChange={handleChange}
                        value={values.webDeveloper.featureSuggestion}
                        error={errors.webDeveloper?.featureSuggestion}
                        touched={touched.webDeveloper?.featureSuggestion}
                        rows={2}
                      />
                    </>
                  )}

                  {selectedPositions.includes("appDeveloper") && (
                    <>
                      <h2 className="text-lg font-bold bg-gradient-to-r from-slate-700 dark:from-gray-400  to-slate-400 dark:to-gray-300 bg-clip-text text-transparent">
                        App Developer
                      </h2>
                      <CustomTextArea
                        label="Do you develop apps for Android, iOS, or both? Which tools or languages do you use?"
                        id="appDeveloper.technologies"
                        placeholder="eg.: Java, Dart, Android Studio, Flutter, React Native"
                        handleChange={handleChange}
                        value={values.appDeveloper.technologies}
                        error={errors.appDeveloper?.technologies}
                        touched={touched.appDeveloper?.technologies}
                        rows={2}
                      />

                      <CustomTextArea
                        label="Have you built any apps before?"
                        id="appDeveloper.projects"
                        placeholder="Please share links if available"
                        handleChange={handleChange}
                        value={values.appDeveloper.projects}
                        error={errors.appDeveloper?.projects}
                        touched={touched.appDeveloper?.projects}
                        rows={2}
                      />
                      <CustomTextArea
                        label="What’s a concept or tool you’re currently learning?"
                        id="appDeveloper.learning"
                        placeholder="Share what you are currently learing about"
                        handleChange={handleChange}
                        value={values.appDeveloper.learning}
                        error={errors.appDeveloper?.learning}
                        touched={touched.appDeveloper?.learning}
                        rows={2}
                      />

                      <CustomTextArea
                        label="What kind of app would you like to create for GDG HIT to help the student community?"
                        id="appDeveloper.featureSuggestion"
                        placeholder="Share your creative ideas"
                        handleChange={handleChange}
                        value={values.appDeveloper.featureSuggestion}
                        error={errors.appDeveloper?.featureSuggestion}
                        touched={touched.appDeveloper?.featureSuggestion}
                        rows={2}
                      />
                    </>
                  )}

                  {selectedPositions.includes("publicRelations") && (
                    <>
                      <h2 className="text-lg font-bold bg-gradient-to-r from-slate-700 dark:from-gray-400  to-slate-400 dark:to-gray-300 bg-clip-text text-transparent">
                        Public Relations
                      </h2>
                      <CustomTextArea
                        label="Why do you think you are fit for Public Relations?"
                        id="publicRelations.mockPost"
                        placeholder=""
                        handleChange={handleChange}
                        value={values.publicRelations.mockPost}
                        error={errors.publicRelations?.mockPost}
                        touched={touched.publicRelations?.mockPost}
                        rows={2}
                      />

                      <CustomTextArea
                        label="Do you have experience in handling social media, outreach, or event management?"
                        id="publicRelations.experience "
                        placeholder=""
                        handleChange={handleChange}
                        value={values.publicRelations.experience}
                        error={errors.publicRelations?.experience}
                        touched={touched.publicRelations?.experience}
                        rows={2}
                      />
                    </>
                  )}

                  {selectedPositions.includes("videoEditor") && (
                    <>
                      <h2 className="text-lg font-bold bg-gradient-to-r from-slate-700 dark:from-gray-400  to-slate-400 dark:to-gray-300 bg-clip-text text-transparent">
                        Video Editor
                      </h2>
                      <CustomTextArea
                        label="Which video editing tools do you use"
                        id="videoEditor.tools"
                        placeholder="eg.-Premiere Pro, DaVinci Resolve, CapCut, etc"
                        handleChange={handleChange}
                        value={values.videoEditor?.tools}
                        error={errors.videoEditor?.tools}
                        touched={touched.videoEditor?.tools}
                        rows={2}
                      />

                      <CustomTextArea
                        label="Provide a link to a video you've edited"
                        id="videoEditor.videoLink "
                        placeholder=""
                        handleChange={handleChange}
                        value={values.videoEditor.videoLink}
                        error={errors.videoEditor?.videoLink}
                        touched={touched.videoEditor?.videoLink}
                        rows={2}
                      />

                      <CustomTextArea
                        label="Are you familiar with color grading, motion graphics, or animations?"
                        id="videoEditor.experience "
                        placeholder=""
                        handleChange={handleChange}
                        value={values.videoEditor.videoLink}
                        error={errors.videoEditor?.videoLink}
                        touched={touched.videoEditor?.videoLink}
                        rows={2}
                      />
                    </>
                  )}

                  {selectedPositions.includes("contentWriter") && (
                    <>
                      <h2 className="text-lg font-bold bg-gradient-to-r from-slate-700 dark:from-gray-400  to-slate-400 dark:to-gray-300 bg-clip-text text-transparent">
                        Content Writer
                      </h2>
                      <CustomTextArea
                        label="Have you written blogs/articles before"
                        id="contentWriter.hasWrittenBefore"
                        placeholder=" If Yes, share a sample or link"
                        handleChange={handleChange}
                        value={values.contentWriter?.hasWrittenBefore}
                        error={errors.contentWriter?.hasWrittenBefore}
                        touched={touched.contentWriter?.hasWrittenBefore}
                        rows={2}
                      />
                    </>
                  )}

                  {selectedPositions.includes("graphicsDesigner") && (
                    <>
                      <h2 className="text-lg font-bold bg-gradient-to-r from-slate-700 dark:from-gray-400  to-slate-400 dark:to-gray-300 bg-clip-text text-transparent">
                        Graphic Designer
                      </h2>
                      <CustomTextArea
                        label="Which design tools do you use?"
                        id="graphicsDesigner.designTools"
                        placeholder="eg.- Photoshop, Illustrator, Figma, Canva, etc"
                        handleChange={handleChange}
                        value={values.graphicsDesigner?.designTools}
                        error={errors.graphicsDesigner?.designTools}
                        touched={touched.graphicsDesigner?.designTools}
                        rows={1}
                      />

                      <CustomTextArea
                        label="Provide a link to your design portfolio"
                        id="graphicsDesigner.portfolioLink"
                        placeholder=""
                        handleChange={handleChange}
                        value={values.graphicsDesigner?.portfolioLink}
                        error={errors.graphicsDesigner?.portfolioLink}
                        touched={touched.graphicsDesigner?.portfolioLink}
                        rows={1}
                      />

                      <CustomTextArea
                        label="Are you comfortable creating social media banners, event posters, and UI/UX designs?"
                        id="graphicsDesigner.socialMediaDesign"
                        placeholder="Yes/No"
                        handleChange={handleChange}
                        value={values.graphicsDesigner?.socialMediaDesign}
                        error={errors.graphicsDesigner?.socialMediaDesign}
                        touched={touched.graphicsDesigner?.socialMediaDesign}
                        rows={1}
                      />
                    </>
                  )}


{selectedPositions.includes("photographer") && (
                    <>
                      <h2 className="text-lg font-bold bg-gradient-to-r from-slate-700 dark:from-gray-400  to-slate-400 dark:to-gray-300 bg-clip-text text-transparent">
                       Photographer
                      </h2>
                      <CustomTextArea
                        label="What type of photography are you skilled in?"
                        id="photographer.photographyType"
                        placeholder="eg.- Event, Portrait, Product, etc"
                        handleChange={handleChange}
                        value={values.photographer?.photographyType}
                        error={errors.photographer?.photographyType}
                        touched={touched.photographer?.photographyType}
                        rows={1}
                      />

                      <CustomTextArea
                        label="Do you have experience covering live events?"
                        id="photographer.eventExperience"
                        placeholder=""
                        handleChange={handleChange}
                        value={values.photographer?.eventExperience}
                        error={errors.photographer?.eventExperience}
                        touched={touched.photographer?.eventExperience}
                        rows={1}
                      />

                      <CustomTextArea
                        label="Provide a link to your photography portfolio"
                        id="photographer.photographyPortfolio"
                        placeholder=""
                        handleChange={handleChange}
                        value={values.photographer?.photographyPortfolio}
                        error={errors.photographer?.photographyPortfolio}
                        touched={touched.photographer?.photographyPortfolio}
                        rows={1}
                      />

<CustomTextArea
                        label="Do you own a DSLR/Mirrorless camera or use a smartphone for photography?"
                        id="photographer.cameraModel"
                        placeholder=""
                        handleChange={handleChange}
                        value={values.photographer?.cameraModel}
                        error={errors.photographer?.cameraModel}
                        touched={touched.photographer?.cameraModel}
                        rows={1}
                      />
                    </>
                  )}
                  {/* Add other role-specific fields similarly */}
                </>
              )}

              {step === 4 && (
                <>
                  <CustomInput
                    label="LinkedIn URL"
                    id="linkedIn"
                    type="text"
                    placeholder=""
                    handleChange={handleChange}
                    value={values.linkedIn}
                    error={errors.linkedIn}
                    touched={touched.linkedIn}
                  />

                  <CustomInput
                    label="Portfolio URL"
                    id="portfolio"
                    type="text"
                    placeholder=""
                    handleChange={handleChange}
                    value={values.portfolio}
                    error={errors.portfolio}
                    touched={touched.portfolio}
                  />

                  <CustomInput
                    label="Previous Clubs"
                    id="previousClubs"
                    type="text"
                    placeholder=""
                    handleChange={handleChange}
                    value={values.previousClubs}
                    error={errors.previousClubs}
                    touched={touched.previousClubs}
                  />

                  <CustomInput
                    label="Time Commitment"
                    id="timeCommitment"
                    type="text"
                    placeholder=""
                    handleChange={handleChange}
                    value={values.timeCommitment}
                    error={errors.timeCommitment}
                    touched={touched.timeCommitment}
                  />

                  <CustomInput
                    label="Reason to Join"
                    id="reasonToJoin"
                    type="text"
                    placeholder=""
                    handleChange={handleChange}
                    value={values.reasonToJoin}
                    error={errors.reasonToJoin}
                    touched={touched.reasonToJoin}
                  />
                </>
              )}

              <div className="flex justify-between w-full end">
                {step > 1 && (
                  <Button
                    type="button"
                    onClick={handlePrevious}
                    className="font-semibold text-base bg-gray-500 hover:bg-gray-600 text-slate-100 transition-colors duration-300 ease-in-out mt-2"
                  >
                    Previous
                  </Button>
                )}

                {step < 4 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="font-semibold ms-auto dark:text-white bg-blue-600 dark:bg-blue-700 text-base hover:bg-blue-700 transition-colors duration-300 ease-in-out mt-2"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="font-semibold text-base dark:text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 transition-colors duration-300 ease-in-out mt-2"
                  >
                    Submit
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
