### 👋 **I am Erhan ERTEM**

&emsp;

## Udemy The Ultimate React Course 2024: React, Redux & More by Jonas Schmedtmann

### **Objective:** Create The Wild Oasis App

<details>
<summary>Key take-aways from this project:</summary>

- React folder structure and project planning

- Styling w/ Styled Components

  - Create in-component styled-components
  - Create global styled-component
    - createGlobalStyles Tagged Template Literal
    - Provide global styles to the app
  - Symbols in styled Components
    - Experiment w/ css literal prefix hack to get prettier support on the code
    - Experiment w/ & symbol for SASS like feature inside styled components
  - Dynamic styled-components
    - template literals + conditional statements
  - Creating re-usable styled components
    - Propping via 'custom_named' prop
      - \<StyleSheetManager> App wrapper SC component for enabling transient custom props
    - Propping via 'as' prop (HTML tag modifier)
    - defaultProps function - Set defaults for the propping type
  - Create styled component contemplating a (ReactRouter) component
    - styled() SC function
  - Create styled component w/ injected tag element attributes for code abstraction
    - attrs() SC function

- React Router

  - Declariative route setup
    - BrowserRouter RR component
    - Routes RR component
    - Route RR component
    - Create index RR route
      - Navigate RR component
      - replace attribute
    - Create wrapper component (routeless) RR route used across multiple routes
      - \<Outlet/> RR component - Have wrapper RR route pass thru child routes

- Tanstack Query

  - Create TQ client
    - Get instance of TQ client via useQueryClient TQ hook
  - Provide TQ client via \<QueryClientProvider/>
  - Query Remote Data
    - 'GET' data w/ useQuery TQ hook
    - 'POST'/'UPDATE'/'DELETE' data w/ useMutation TQ hook
  - Re-factoring TQ context snippets to dry react components

- Reach-Hook-Form

  - Manual user triggered form submission
    - useForm() RHF hook
    - Standard Form validation RHF rules (required, min, max) - Custom(functionalized) Form validation rule (validate)
    - Read values from form fields via getValues() RHF fn to compliment dependant validation challanges
  - Automatic onBlur type form submission

  </details>

&emsp;

In addition to the project cirriculum:

- Provide custom solutions around cabin API
  - Refined cabin edit and create API handling
  - Improved DELETE functionality w/ cabin data recovery feature upon unsuccessful image delete operation
- Implement auto switching forms @ cabins page between edit forms and create forms allowing only a single form displayed
  at a time.
- Restrict deletion of shared image bucket files, if shared more than one cabin to keep integrity of cabin table data.
- Avoid redundant PATCH fetch requests by checking the currValue against the onBlur value while handling automatic
  onBlur type form submission @ settings page

#### <img src="./push.gif" width="30px"/>[The Wild Oasis App](https://****)

<img src="./screenshot.webp" width="600px"/>

---

![JS](https://img.shields.io/badge/JavaScript-323330?style=square&logo=javascript&logoColor=F7DF1E)
![React](https://img.shields.io/badge/React-20232A?style=square&logo=react&logoColor=61DAF)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=square&logo=styled-components&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=square&logo=react-router&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=square&logo=ReactQuery&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=square&logo=reacthookform&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=square&logo=vite&logoColor=FFD62E)
