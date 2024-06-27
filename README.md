# SensorDataDashboard

The SensorDataDashboard is a comprehensive React component for visualizing various sensor data and analysis. This dashboard is primarily intended for applications related to environmental monitoring such as humidity, CO2 levels, soil moisture, and more. This is the frontend code to my IoT project for my "smart compost"

More information [here](https://hackmd.io/@3KzL4qeKQkifnP_tzEbLJQ/SJv5nV9LC)
[Backend repository](https://github.com/MarkerAnn/Smart-Compost.git)

## Features

- **Real-time Sensor Data Visualization**: Shows live data feeds from sensors, providing insights into environmental conditions.
- **Latest Readings Display**: Presents the most recent readings from each sensor.
- **Data Analysis**: Includes components for further analysis like weather impact and compost quality.
- **Responsive Design**: Adapts to different screen sizes and resolutions, ensuring a seamless user experience across devices.

## Installation

Before you can run the SensorDataDashboard, make sure you have Node.js installed. Then, clone this repository and install the dependencies:

```bash
git clone <repository-url>
cd <repository-directory>
npm install
```

## Usage

To start the application, run:

```bash
npm start
```

This command will start the React application on `localhost:3000` (or your custom specified port). Navigate to this address in your web browser to view the dashboard.

## Components

The dashboard includes the following main components:

- `SensorChart`: Graphical representation of sensor data over time.
- `LatestReading`: Displays the latest readings from each sensor.
- `WeatherComponent`: Analyzes and displays weather data relevant to the sensor data. Using Open Weather API
- `CompostAnalysis`: Provides insights into compost quality based on sensor readings. Using Open AIs API

## API Integration

The dashboard fetches sensor data from an AWS backend. Ensure your AWS credentials and permissions are set up correctly. The `fetchData` function is pivotal for retrieving data from AWS:

```jsx
import fetchData from './aws/fetchData'
```

## Error Handling

Errors are handled gracefully within the dashboard. In case of data fetching issues, an error message is displayed prominently to alert the user.

## Styling

The application uses Tailwind CSS for styling. The design is flexible, allowing easy customization according to your branding requirements.
