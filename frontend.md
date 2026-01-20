# Frontend description

Framework: React
Language: Typescript
Forms: React Hook Form + Zod
State management: Zustand
Service calls: default react fetch

Should create:
- single page application
- 2 screens:
    1. Home screen
        - contains text box to enter a company ticker
        - and a button to fetch
        - pressing fetch calls the getFlowStatus function of the CompaniesService
        - if flow does not exist calls the fetchCompany function of the CompaniesSerice
        - redirects to company page

    2. Company page
        - shows company ticker,
        - calls getFlowStatus:
            - no flow found => calls fetchCompany
            - flow found, no overview => loading
            - flow found, overview, no cash flows => show company overview, with fetch cash flows button
            - flow found, overview, cash flows => show overview, cash flow statement below

Directory structure:
- components: src/components
- services: src/services
- types: src/types
- hooks: src/hooks
- zod schemas: src/schemas
- utils: src/utils
