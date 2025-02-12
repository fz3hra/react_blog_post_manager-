# Blog Post Manager - Frontend

The Blog Post Manager frontend is a modern web application built with React and TypeScript, providing a seamless user experience for managing blog posts. This document outlines how to run the project, explains our design choices, and describes the available features.

## Running the Project - option 1

To run the Blog Post Manager frontend, ensure you have Node.js version 14 or higher installed on your system. Then follow these steps:

First, install all required dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:5173.

## Running the Project - option 2

The Blog Post Manager client can be run using Docker by following these two steps:

```bash
docker compose build
docker compose up -d
```

To stop the application, you can use the command:

```bash
docker compose down
```

## Design Choices

We made several key architectural decisions to ensure maintainability, scalability, and optimal user experience:

### Component Architecture

The application uses a component-based architecture with a clear separation between smart and presentational components. Smart components handle business logic and state management, while presentational components focus solely on rendering UI elements. This separation improves code reusability and makes testing more straightforward.

### State Management

We chose to use React Context for global state management, particularly for authentication state. This decision provides a good balance between complexity and functionality, avoiding the overhead of larger state management libraries while maintaining good performance and developer experience.

### Custom Hooks

The application leverages custom hooks to encapsulate complex logic and state management. This approach improves code reusability and maintains a clear separation of concerns. For example, the usePostEditor hook manages all post editing functionality, making it easy to maintain and test.

### TypeScript Integration

TypeScript provides strong typing throughout the application, reducing runtime errors and improving developer productivity. We've defined clear interfaces for all data structures and component props, ensuring type safety across the application.

### Styling Solution

We implemented Tailwind CSS for styling, which provides utility-first CSS classes. This choice enables rapid development, maintains consistency across the application, and reduces the overall CSS bundle size through its purge feature.

## Features

### Authentication System

The application implements a secure authentication system with the following capabilities:

- JWT-based authentication with secure token storage
- Protected routes requiring authentication
- Automatic redirection to login for unauthorized access

### Post Management

Users can manage their blog posts through a comprehensive set of features:

- Creation and editing of posts with real-time preview
- Support for draft and published states
- Word count tracking
- Batch deletion

### Additional Features

We've implemented several features to enhance the user experience:

- Real-time word count tracking
- Rich text editing capabilities
- Session persistence across page refreshes

### To come

- Featured image upload and management
- Tag management system
- Auto-save functionality for drafts
- Image optimization for uploaded content
- Tag suggestions based on post content
- Keyboard shortcuts for common actions

## Development Workflow

To add new features or fix bugs, follow these steps:

1. Create a new branch from main:

```bash
git checkout -b feature/your-feature-name
```

2. Implement your changes and add tests:

```bash
npm run test
```

3. Build the project to ensure everything compiles:

```bash
npm run build
```

4. Submit a pull request with your changes.

## Current Limitations

### Image Upload Functionality

The image upload functionality is currently not implemented due to cloud platform access constraints. Proper implementation of image management requires secure cloud infrastructure integration, which is pending. This limitation affects:

1. Featured image uploads for blog posts
2. In-content image management
3. Media library functionality

A complete image management solution will require:

- Integration with a cloud storage platform (AWS S3, Google Cloud Storage, or Azure Blob Storage)
- Content delivery network (CDN) setup for optimized image serving
- Secure access control and authentication mechanisms
- Image processing capabilities for resizing and optimization

This functionality will be implemented once the necessary cloud platform access and infrastructure are established.

## Future Improvements

We plan to implement several enhancements:

- Advanced image editing capabilities
- Social media preview generation
- Analytics dashboard for post performance
- Collaborative editing features

## Troubleshooting

If you encounter issues during setup or development:

1. Verify environment variables are correctly set
2. Ensure all dependencies are installed with `npm install`
3. Clear browser cache and local storage
4. Check console for error messages
5. Verify backend services are running and accessible

For additional help, consult the technical documentation or create an issue in the repository.

## Snapshots:

<img width="1440" alt="Screenshot 2025-02-12 at 18 21 02" src="https://github.com/user-attachments/assets/9b1aa17d-349b-4a2b-a55b-57877c798118" />
<img width="1440" alt="Screenshot 2025-02-12 at 18 20 47" src="https://github.com/user-attachments/assets/a5794b98-5389-4375-8b2c-f54b15df00a7" />
<img width="1440" alt="Screenshot 2025-02-12 at 18 20 41" src="https://github.com/user-attachments/assets/f43d218d-24d7-42e7-a2e4-d3feabaae5b0" />
<img width="1440" alt="Screenshot 2025-02-12 at 18 20 38" src="https://github.com/user-attachments/assets/078f7e95-d344-426b-ac5a-8854603641c4" />
<img width="1440" alt="Screenshot 2025-02-12 at 18 20 19" src="https://github.com/user-attachments/assets/2e42267e-cf70-43c7-9266-232885180b3f" />
<img width="1440" alt="Screenshot 2025-02-12 at 18 20 14" src="https://github.com/user-attachments/assets/fc9eaa81-076e-47a4-9689-274244c61343" />
<img width="1440" alt="Screenshot 2025-02-12 at 18 20 11" src="https://github.com/user-attachments/assets/59014418-3788-4b0d-a5a4-8f6898b1fed5" />
<img width="1440" alt="Screenshot 2025-02-12 at 18 20 04" src="https://github.com/user-attachments/assets/f7b03eb6-f038-49bd-8f71-f321dfed9484" />
<img width="1440" alt="Screenshot 2025-02-12 at 18 19 58" src="https://github.com/user-attachments/assets/3a188fd0-7699-4859-87e4-b80a4b042a1b" />
<img width="1440" alt="Screenshot 2025-02-12 at 18 19 53" src="https://github.com/user-attachments/assets/da89033b-6a08-4658-8f11-d849f881dee9" />
<img width="1440" alt="Screenshot 2025-02-12 at 18 19 40" src="https://github.com/user-attachments/assets/7d28f853-0668-49d5-a6d8-41a539bb5d76" />
<img width="1440" alt="Screenshot 2025-02-12 at 18 19 17" src="https://github.com/user-attachments/assets/d350d34e-c424-405f-ada6-d9a1ace49858" />
<img width="1440" alt="Screenshot 2025-02-12 at 18 18 49" src="https://github.com/user-attachments/assets/159d288c-b88c-4fc8-a4b8-2d9a7706b379" />
<img width="1440" alt="Screenshot 2025-02-12 at 18 18 35" src="https://github.com/user-attachments/assets/a9e14376-6e7a-44bf-9ed6-df8e1dc802bd" />
<img width="1440" alt="Screenshot 2025-02-12 at 18 15 33" src="https://github.com/user-attachments/assets/e976988d-cbfe-4d56-bfa0-16c75d427b34" />
<img width="1440" alt="Screenshot 2025-02-12 at 18 15 28" src="https://github.com/user-attachments/assets/8811c19d-7115-4154-a6fe-e33d74aba076" />
<img width="1440" alt="Screenshot 2025-02-12 at 18 15 17" src="https://github.com/user-attachments/assets/254d7871-0141-48d0-9c86-f235b89e975d" />
<img width="1440" alt="Screenshot 2025-02-12 at 18 14 28" src="https://github.com/user-attachments/assets/9d1afe05-a6b3-4547-b30b-2dc4487e50e7" />
<img width="1440" alt="Screenshot 2025-02-12 at 18 00 26" src="https://github.com/user-attachments/assets/d2fcc506-1784-4063-adb6-c07761588c3f" />
<img width="1440" alt="Screenshot 2025-02-12 at 18 00 20" src="https://github.com/user-attachments/assets/95fc84d2-94bb-4824-98b3-121048f68c29" />
<img width="1440" alt="Screenshot 2025-02-12 at 18 00 13" src="https://github.com/user-attachments/assets/b1caa9b4-1351-4c1d-b223-cc0b4e6afef0" />
<img width="1440" alt="Screenshot 2025-02-12 at 17 59 49" src="https://github.com/user-attachments/assets/17bb8434-c3a4-4284-a448-c4487ace4abe" />
<img width="1440" alt="Screenshot 2025-02-12 at 17 59 25" src="https://github.com/user-attachments/assets/8094c1b0-1025-4aab-b6d5-7f1cc50d3c69" />
<img width="1440" alt="Screenshot 2025-02-12 at 17 59 06" src="https://github.com/user-attachments/assets/32870bc4-b114-441e-82cd-34e2fb397b15" />
