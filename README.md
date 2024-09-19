# Sagar Sanjeevani - Mobile & Web Application for Beach Safety

Welcome to Sagar Sanjeevani, a mobile and web application aimed at enhancing tourist safety in India's coastal regions. This project addresses the need for real-time recreational suitability information for beaches across India, allowing tourists to plan their visits and activities safely.

## Project Overview

- **Problem Statement ID:** SIH 1656
- **Project Title:** Development of a mobile application to provide recreational suitability information of beach locations across India
- **Theme:** Travel & Tourism
- **Category:** Software
- **Team Name:** Hummingbirds

## Project Description

Sagar Sanjeevani is a mobile and web-based platform designed to enhance the safety and recreational experience of tourists visiting India's coastal regions. The app provides real-time beach safety information by evaluating multiple environmental parameters such as ocean state, meteorological conditions, and potential hazards. Using the INCOIS API and other data sources, the application helps users make informed decisions about beach visits and recreational activities.

### Key Features:

- **Real-Time Recreational Suitability:** Provides real-time beach safety data based on ocean conditions, weather, and alerts.
- **Geospatial Maps & Color-Coded Indicators:** Interactive maps with safety indicators to give users a quick and clear overview of beach conditions.
- **Personalized Alerts:** Real-time notifications for location-specific alerts and warnings.
- **Multilingual Support:** User interface and notifications in multiple languages for broader accessibility.
- **User Preferences:** Adjusts safety predictions based on user-specific preferences.
- **OBSS (Overall Beach Safety Score):** Combines key parameters into a safety score ranging from 0 (dangerous) to 100 (ideal).

## Technical Approach

The technical backbone of Sagar Sanjeevani combines modern technologies to deliver a seamless user experience and reliable data.

### Key Components:

- **Frontend:** React for the mobile and web user interface.
- **Backend:** Node.js and Flask APIs to handle business logic, with integration to various services.
- **AI/ML Components:** Python and TensorFlow are used for beach safety predictions and real-time hazard detection.
- **Cloud Services:** AWS S3 for storage, SNS and Lambda for notifications and serverless functions.
- **Database:** Supabase as the primary database.
- **Security:** Hyperledger Fabric ensures data security and integrity.
- **AR Model:** Utilizes Three.js, WebXR, and Blender to create Augmented Reality features.
- **UI Design Tool:** Figma for designing the user interface and user experience.

### Workflow Diagram:

The system workflow includes data acquisition from radars and sensors, signal processing, and data display to the user. The data pipeline involves the following steps:

1. **Data Collection:** Real-time data from radars and sensors via web socket servers.
2. **Signal Processing:** ADC conversion, baseband signal acquisition, and AI-based analysis.
3. **Data Presentation:** Display of OBSS score, geospatial maps, safety alerts, and real-time video feeds in the app.

## Feasibility & Features

### OBSS-Based Grading Adjustments:

- **Alert System:** Real-time alerts when the OBSS falls below a set threshold, ensuring user safety.
- **Geographical Variability:** Custom predictions based on regional differences, enhancing the accuracy of beach conditions.
- **Real-Time Video Monitoring:** Live video feeds provide insights into beach conditions, including crowd density, weather, and potential hazards.
- **Multilingual Support:** Offers content and notifications in multiple languages, improving accessibility for diverse users.
- **User-Specific Preferences:** OBSS adjustments based on individual user preferences for more personalized predictions.

### OBSS (Overall Beach Safety Score):

The OBSS score aggregates key parameters such as ocean state, meteorological conditions, and crowd density into a safety index ranging from:

- 0: Dangerous conditions (e.g., storms, high tides)
- 100: Ideal beach conditions for recreational activities.

## Potential Impact

Sagar Sanjeevani has the potential to revolutionize coastal tourism in India by significantly improving tourist safety. By providing real-time, personalized, and reliable data, the app can enhance the overall tourist experience and ensure informed decision-making for safe beach visits.

## Research & References

- [GitHub Repository: Sagar Sanjeevani Project](https://github.com/sagnik3788/sagar-sanjeevani.git)
- [Prototype: Sagar Sanjeevani Web App](https://example.com/sagar-sanjeevani-prototype)
- [Weather Alert API: NOAA Weather API](https://www.weather.gov/documentation/services-web-api)
- [Real-Time Streaming Technology: Flashphoner Dynamic CDN for Low-Latency WebRTC Streaming](https://flashphoner.com/dynamic-cdn-for-low-latency-webrtc-streaming/)

## Setup Instructions

### Prerequisites:

- Node.js installed on your machine.
- Python for AI/ML components.
- React for frontend development.
- AWS Account for cloud services (S3, SNS, Lambda).
- Supabase account for the database.

### How to Install and Run:

1. Clone the repository:
   ```bash
   git clone https://github.com/sagnik3788/sagar-sanjeevani.git
   cd sagar-sanjeevani
   ```

2. Install dependencies for the frontend:
   ```bash
   cd frontend
   npm install
   ```

3. Install dependencies for the backend:
   ```bash
   cd backend
   npm install
   ```

4. Install Python dependencies for AI/ML components:
   ```bash
   pip install -r requirements.txt
   ```

5. Set up environment variables for AWS, Supabase, and APIs.

6. Run the application:
   - Frontend: `npm start`
   - Backend: `npm run dev`
   - AI/ML Model: Execute the Python scripts for model prediction.

## Contributions

Contributions are welcome! Feel free to submit issues or pull requests on our GitHub repository.
