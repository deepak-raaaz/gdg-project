import * as Yup from "yup";

// Step 1: General Information
export const step1Schema = Yup.object().shape({
  fullName: Yup.string().required("Please enter your full name"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  phoneNumber: Yup.number().required("Please enter your phone number"),
  rollNumber: Yup.number().required("Please enter your roll number"),
  branch: Yup.string().required("Please select your branch"),
  branchYear: Yup.string().required("Please select your year"),
  positions: Yup.array()
    .of(Yup.string())
    .min(1, "Please select at least one position")
    .required("Please select the position(s) you are applying for"),
});

// Step 2: Perspective on GDG HIT
export const step2Schema = Yup.object().shape({
  perspective: Yup.string().required("This field is required"),
  eventIdeas: Yup.string().required("This field is required"),
});

// Step 3: Role-Specific Questions
export const getStep3Schema = (selectedPositions: string[]) => {
  const roleSchemas: Record<string, Yup.ObjectSchema<any>> = {
    webDeveloper: Yup.object().shape({
      technologies: Yup.string().nullable(),
      projects: Yup.string().nullable(),
      learning: Yup.string().nullable(),
      featureSuggestion: Yup.string().nullable(),
    }),
    appDeveloper: Yup.object().shape({
      technologies: Yup.string().nullable(),
      projects: Yup.string().nullable(),
      learning: Yup.string().nullable(),
      featureSuggestion: Yup.string().nullable(),
    }),

    publicRelations: Yup.object().shape({
      mockPost: Yup.string().max(150, "Post should not exceed 150 words"),
      experience : Yup.string().nullable(),
      preferredPlatforms: Yup.string().nullable(),
    }),
    videoEditor: Yup.object().shape({
      tools: Yup.string().nullable(),
      videoLink: Yup.string().url("Please enter a valid video URL"),
      motionGraphics: Yup.boolean(),
    }),
    contentWriter: Yup.object().shape({
      hasWrittenBefore: Yup.string().nullable(),
    }),
    graphicsDesigner: Yup.object().shape({
      designTools:Yup.string().nullable(),
      portfolioLink: Yup.string().nullable(),
      socialMediaDesign: Yup.string().nullable(),
      eventPosterConcept: Yup.string().nullable(),
    }),
    photographer: Yup.object().shape({
      photographyType: Yup.string().nullable(),
      eventExperience: Yup.string().nullable(),
      photographyPortfolio: Yup.string().nullable(),
      cameraModel: Yup.string().nullable(),
    }),
  };

  let dynamicSchema = Yup.object();
  selectedPositions.forEach((position) => {
    if (roleSchemas[position]) {
      dynamicSchema = dynamicSchema.concat(
        Yup.object().shape({
          [position]: roleSchemas[position],
        })
      );
    }
  });

  return dynamicSchema;
};

// Step 4: Final Information
export const step4Schema = Yup.object().shape({
  linkedIn: Yup.string().url("Please enter a valid LinkedIn URL").nullable(),
  portfolio: Yup.string().url("Please enter a valid portfolio URL").nullable(),
  previousClubs: Yup.string().nullable(),
  timeCommitment: Yup.string().required(
    "Please specify your weekly commitment"
  ),
  reasonToJoin: Yup.string()
    .max(200, "Answer should not exceed 200 words")
    .required("Please provide a reason for joining GDG HIT"),
});
