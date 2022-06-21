import { Age, Gender, IDimCustomer } from "interfaces/data.interface";

export const getCategoryLabels = (
  category: keyof IDimCustomer,
  key: string
) => {
  switch (category) {
    case "gender":
      switch (key) {
        case Gender.female:
          return "Female";
        case Gender.male:
          return "Male";
        default:
          return "Others";
      }
    case "dob":
      switch (key) {
        case Age.teen:
          return "Under 18";
        case Age.young_adult:
          return "18 to 25";
        case Age.adult:
          return "26 to 65";
        case Age.elder:
        default:
          return "Over 65";
      }
    default:
      return key;
  }
};
