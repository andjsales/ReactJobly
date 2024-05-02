App

    NavBar                       Navigation bar, shows different links based on auth status
        props=logout(), isLoggedIn

    Routes                       Manages routes and protected routes
        props=login(), signup(), isLoggedIn
        state=currentUser

        Home                     Landing page, displays differently based on auth status
            props=isLoggedIn

        CompanyList              Lists all companies, search functionality
            state=companies, searchTerm
            props=none

            CompanyCard          Represents a single company in the list
                props=handle, name, description, logoUrl

        CompanyDetail            Shows details for a single company
            state=company, jobs
            props=handle (from URL)

            JobCard               Used in both CompanyDetail and Jobs, shows job details
                props=id, title, salary, equity

        Jobs                     Lists all jobs, search functionality
            state=jobs, searchTerm
            props=none

            JobCard               (same as used in CompanyDetail)

        login                Manages user login form data
            state=formData
            props=login()

        SignupForm               Manages user signup form data
            state=formData
            props=signup()

        Profile                  Allows users to edit their profile
            state=formData
            props=currentUser, updateCurrentUser()

- App
  - Navbar
  - Routes
    - Home
    - CompanyList
      - SearchForm
      - CompanyCard
    - CompanyDetails
    - JobCard
    - JobList
      - SearchForm
      - JobCard
    - Login
    - SignUp
    - Profile
      - ProfileForm
