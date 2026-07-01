# GitNova 
**Advanced Web Application Development - University of Kelaniya (UoK)**

## Project Overview
GitNova is an exclusive university platform designed to bridge the gap between students and recruiters. It serves as a centralized hub where students can showcase their academic and personal projects, and recruiters can discover university talent.

## System Requirements

### 1. Authentication and Authorization
* **Unified Login:** A single, centralized login interface handles authentication for all user types (Students, Lecturers, and Recruiters). No separate login portals are required.
* **Closed Registration:** Access is restricted to university members. Registration is handled via a secure, shared link provided directly to students and lecturers.
* **Role Separation:** Distinct roles exist for Students and Recruiters. A single user account cannot act as both a student and a recruiter simultaneously. 

### 2. Project Management
* **Core Project Information:** Every project submission must include the following fields:
  * Project Name
  * Description
  * Technologies Used
  * Cover Image
  * Additional Images
  * Demo URL
* **Editability:** Projects remain completely editable by the creator at all times, even after they have received engagement (such as likes) from other users.

### 3. Visibility and Access Control
* **Privacy by Default:** Upon creation, all projects are set to private by default. 
* **Recruiter Privileges:** Recruiters hold the specific authority to transition a project's visibility from private to public.

### 4. Engagement and Discovery
* **Search Functionality:** The platform includes a robust search feature allowing users to find specific projects easily.
* **Liking System:**
  * Users have the ability to like projects.
  * Students are explicitly permitted to like their own projects.
  * *Note:* While a liking system is present, enforcing students to like other students' projects is not a mandatory system requirement.
* **Social Restrictions:** Students do not have the ability to "follow" other students on the platform.

### 5. UI / UX Design
* **Theme:** The application interface must be designed utilizing a strict **dark color theme**.

---
*Developed by Team GitNova*
