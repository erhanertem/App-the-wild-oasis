### Hi! <img src="https://raw.githubusercontent.com/erhanertem/erhanertem/main/icons/wave.gif" width="30px"/> **I am Erhan ERTEM**

&emsp;

## Udemy The Ultimate React Course 2024: React, Redux & More by Jonas Schmedtmann

### **Objective:** Create the Wild Oasis App for Internal Company Operations

<details>

<summary><img src="https://raw.githubusercontent.com/erhanertem/erhanertem/main/icons/education.gif" width="30px"/><strong>Key take-aways from this project...</strong></summary>

- React folder structure and project planning

- Contemplate Global Remote States w/ Supabase
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
      - \<StyleSheetManager> App wrapper SC component for enabling transient
        custom props
    - Propping via 'as' polymorphic prop (HTML tag modifier)
    - defaultProps function - Set defaults for the propping type
  - Create styled component contemplating a (ReactRouter) component
    - styled() SC function
  - Create styled component w/ injected tag element attributes for code
    abstraction
    - attrs() SC function
  - Make use of .withConfig() + shouldForwardProp for creating transient prop

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
    - Implement API-side filtering and sorting operations on the bookings table data
      - Limited data fetching / articulate on server side
        - Build dynamic API based on useSearchParams RR URL params state for sorting/filtering instructions as acquired passed onto API call via useQuery TQ data fetching
    - Implement CLIENT-side filtering and sorting operations on the cabins table data
      - Entire data set fetching / articulate on client side
        - useQuery TQ data fetching & useSearchParams RR URL params state for sorting/filtering instructions
    - Read URL path parameter via useParams RR hook to display information about a choosen booking

- Tanstack Query

  - Create TQ client
    - Get instance of TQ client via useQueryClient TQ hook
  - Provide TQ client via \<QueryClientProvider/>
  - Query Remote Data
    - 'GET' data w/ useQuery TQ hook
    - 'POST'/'UPDATE'/'DELETE' data w/ useMutation TQ hook
  - Re-factoring TQ context snippets to dry react components
  - Pre-fetching for backward and forward pagination for better UX via prefetchQuery() TQ Client fn

- Reach-Hook-Form

  - Manual user triggered form submission
    - useForm() RHF hook
    - Standard Form validation RHF rules (required, min, max) -
      Custom(functionalized) Form validation rule (validate)
    - Read values from form fields via getValues() RHF fn to compliment
      dependant validation challanges
  - Automatic onBlur type form submission

- Advanced React

  - useRef() hook for handling portal close by clicking its outer space
  - Create modals using createPortal react fn
  - Utilize compound component pattern to build re-usable modal component
    - Utilize cloneElement() advanced react fn to repack a react component w/ an
      external prop coming from CC API child component
  - Utilize compound component pattern to build re-usable table component
    - Utilize compound component pattern with the assitance of render prop
      pattern @ Table.Body
  - Utilize compound component in conjunction with render prop pattern
  - Handling React errors on the client side gracefully via <strong>React Error Boundaries</strong> library

  </details>

&emsp;

<img src="https://raw.githubusercontent.com/erhanertem/erhanertem/main/icons/learning.gif" width="30px"/><strong>In addition to the project cirriculum:</strong>

- Provide custom solutions around cabin API
  - Refined cabin edit and create API handling
  - Improved DELETE functionality w/ cabin data recovery feature upon
    unsuccessful image delete operation
- Implement auto switching forms @ cabins page between edit forms and create
  forms allowing only a single form displayed at a time.
- Restrict deletion of shared image bucket files if shared by more multiple
  cabins to keep integrity of cabin table data.
- Avoid redundant UPDATE fetch requests by checking the currValue against the
  onBlur value while handling automatic onBlur type form submission @ settings
  page
- Backend updates trigger instant UI updates via Supabase subscription beacons
  eliminating the need of manually refreshing the browser
- Protect login page from being hit intentionally by an authenticated user
- Fix user signup to supabase due to supabase signup fn causing user aut-logout/localStorage supa-auth data swap
- Implement deletion of old avatar picture from the supabase bucket upon user's new avatar upload via <strong>CACHE BUSTING QUERY PARAMETER</strong>

  &emsp;

<img src="https://raw.githubusercontent.com/erhanertem/erhanertem/main/icons/report.gif" width="30px"/> <strong>Pending Issues:</strong>

- Bootleg solution @ supabase subscription beacons needs a better solution.

#### <img src="https://raw.githubusercontent.com/erhanertem/erhanertem/main/icons/file.gif" width="30px"/>[The Wild Oasis App](https://app-wild-oasis-erhan-ertem.netlify.app)

<img src="./screenshot.webp" width="600px"/>

---

![JS](https://img.shields.io/badge/JavaScript-323330?style=square&logo=javascript&logoColor=F7DF1E)
![React](https://img.shields.io/badge/React-20232A?style=square&logo=react&logoColor=61DAF)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=square&logo=styled-components&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=square&logo=react-router&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=square&logo=ReactQuery&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=square&logo=reacthookform&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=square&logo=vite&logoColor=FFD62E)
