# Dorm App

## Description

The application is a platform from where you can get access to different services available in the student dormitory:

### Laundry room

Once you register an account in the app you will have possibitily to book a washing appointment to the laundry room. There is a page to cancel your future appointments.

### Internet Access manager

Also it is possible to register new devices to have internet access by submitting MAC Address and Device description. At the different page all the registered devices and their status are shown.

### Video Demo
https://www.youtube.com/watch?v=MRqAAhcbF_w

---

## Distinctiveness and Complexity

### Backend

The application uses [Django](https://www.djangoproject.com/) and [Django REST Framework](https://www.django-rest-framework.org/) on backend. All the endpoint are API endpoints, that means that no templates are rendered when a client is accesing them, instead JSON responses with different statuses are send back to the client that made a request. The App has 4 models (Room, User, Appointment, Device) and the data is stored in the SQLite Database

### Frontend

The forntend single page application is written in JavaScript using the [React](https://react.dev/) framework and some other technologies:

#### Redux

With use of [React-Redux](https://react-redux.js.org/) and [Redux-toolkit](https://redux-toolkit.js.org/) the storing of authentication data and its availability on every page of the App was implemented.

#### React Router

[React Router](https://reactrouter.com/en/main) was used to create Routes and only rerender different components when accesing different routes, not the whole page.

#### JS-Cookie

With the help of [js-cookie](https://www.npmjs.com/package/js-cookie) the work with cookies and its manipulation was possible.

#### Axios

[Axios](https://axios-http.com/) was used to send http requests to the backend.

#### React-Toastify

[React Toastify](https://www.npmjs.com/package/react-toastify) was used to display messages to the user.

---

## Files

The project has the following file system (automatically created by django/react and not modified files are not included in the chart)

- `appointments` - Django App `appointments` handles operations with washing appointments
  - `models.py` - `Appointment` model to represent a washing appointment
  - `serializers.py` - `AppointmentSerializer` to serialize appointment data before sending it as response, `BookAppointmentSerializer` to serialize incoming request data
  - `urls.py` - Defines urls for `appointment` app: `/appt/get`, `/appt/book`, `appt/my`, `appt/cancel` endpoint to get the appointments by the date, book an appointment, get user's future appointemnts and cancel the appointment.
  - `views.py` - used in the `urls.py` views
- `devices` - Django App `devices` hadles operations with registering / removing devices
  - `models.py` - `Device` model to represent a device
  - `serializers.py` - `DeviceSerializer` and `DeviceAddSerializer` to serialize response / request data
  - `urls.py` - Defines urls for `devices` app: `device/get`, `device/register`, `device/delete` to get user's devices, register a new device and delete a device.
  - `views.py` - used in the `urls.py` views
- `dorm` - Django App `dorm` handles user authentication
  - `admin.py` - registering all models to be editable in admin panel
  - `models.py` - `Room` model to represent a room in the dormitory
  - `serializers.py` - `RoomSerializer` and `UserSerialize` to serialize `Room` and `User` models
  - `urls.py` - Defines urls for `dorm` app: `auth/register`, `auth/login`, `auth/logout`, `auth/check`, `auth/csrf` to register, login, logout, check if authenticated and get a CSRF token.
  - `views.py` - views for `urls.py`
- `backend`
  - `settings.py` - Settings fot the project
  - `urls.py` - Top level URLs
- `build` - build version of the frontend that contains templates
- `frontend` - source code React frontend
  - `src`
    - `app`
      - `store.js` - Configuration for store and reducers for `React-Redux`
    - `components` - Components that will be used in the template
      - `NavBar.js` - Navigation bar
      - `Spinner.js` - Spinner
    - `features`
      - `appt` - Reducers and fucntion for `appt` (appointments) state of the app
        - `apptService.js` - Functions to send requests to the backend server to manage appointments
        - `apptSlice.js` - Reducers for the `appt` state
      - `auth`
        - `authService.js` - Functions to send request to the backend server to manage authentication
        - `authSlice.js` - Reducers for the `auth` state
    - `pages` - Parts of the pages
      - `AddDevice.js` - Page to add register a new device
      - `Appointments.js` - Page with all of the laundry appointments
      - `Dashboard.js` - Dashboard, has links to every section of the App
      - `Devices.js` - Page to display user's registered devices
      - `Login.js` - Login page
      - `MyAppointments.js` - Page to display user's future laundry appointments
      - `Register.js` - Register page
    - `App.css` - Style sheet
    - `App.js` - Main and only page of the App, inside of it all the other pages are rendered
    - `index.js` - index file
  - `package.json` - Dependencies, scripts and other settings
  - `README.md` - Readme for the frontend part
- `db.sqlite3` - Database
- `README.md` - Readme for the whole project

---

## API endpoints

---

## /auth/login

Login user

#### Request method

- POST

#### Request data example

    {
        "username": "username",
        "password": "password"
    }

#### Response data when authentication success (status <font color="green">200</font>)

    {
        "username": "username",
        "room": {
            "id": 6,
            "number": 1702,
            "floor": 17
        }
    }

#### Response data when authentication failed (status <font color="red">400</font>)

    {
        "error": "Invalid username or password"
    }

---

## /auth/check

Check if user is authenticated

#### Request method

- GET

#### Response data when user is authenticated (status <font color="green">200</font>)

    {
        "username": "username",
        "room": {
            "id": 6,
            "number": 1702,
            "floor": 17
        }
    }

#### Response data when user is not authenticated (status <font color="red">401</font>)

    {
        "error": "Not authenticated"
    }

---

## /auth/logout

Logout user

#### Request method

- POST

#### Request body

{}

#### Response example (status <font color="green">200</font>)

    {
        "message": "Logged out"
    }

---

## /auth/register

Register user

#### Request method

- POST

#### Request data example

    {
        "username": "username",
        "password": "password",
        "confirmation": "password",
        "room_number": "1702"
    }

#### Response data when user is successfully registered (status <font color="green">200</font>)

    {
        "username": "username",
        "room": {
            "id": 6,
            "number": 1702,
            "floor": 17
        }
    }

#### Response data when user is not registered (status <font color="red">400</font>)

    {
        "error": "User already exists"
    }

---

## /auth/csrf

Set the csrf token in the cookie

#### Request method

- GET

#### Response (status <font color="green">200</font>)

    {
        "success": "CSRF cookie set"
    }

---

## /appt/get

Get list of appointments

#### Request method

- POST

#### Request data example

    {
        "date": "2023-04-29"
    }

#### Response data when success (status <font color="green">200</font>)

    [
        {
            id: 193,
            room: 110,
            date: '2023-04-29',
            timeslot: 0,
            machine: 0
        },
            {
            id: 194,
            room: 110,
            date: '2023-04-29',
            timeslot: 0,
            machine: 1
            }
    ]

#### Response data when error occurs (status <font color="red">400</font>)

    {
        "error": "something went wrong while getting the data"
    }

---

## /appt/book

Book an appointments

#### Request method

- POST

#### Request data example

    {
        "date": "2023-04-30",
        "timeslot": 2,
        "machine": 1
    }

#### Response data when success (status <font color="green">200</font>)

    {
        "id": 195,
        "room": {
            "id": 3,
            "number": 110,
            "floor": 1
        },
        "date": "2023-04-30",
        "timeslot": 2,
        "machine": 1
    }

#### Response data when error occurs (status <font color="red">400</font>)

    {
        "error": "Max 2 appointments a day allowed"
    }

---

## /appt/my

Get list of user's future appointments

#### Request method

- GET

#### Response data when success (status <font color="green">200</font>)

    [
        {
            "id": 193,
            "room": 110,
            "date": "2023-04-29",
            "timeslot": 0,
            "machine": 0
        },
        {
            "id": 194,
            "room": 110,
            "date": "2023-04-29",
            "timeslot": 0,
            "machine": 1
        }
    ]

#### Response data when error occurs (status <font color="red">400</font>)

    {
        "error": "Not logged in"
    }

---

## /appt/cancel

Cancel the appointment

#### Request method

- POST

#### Request data example

    {
        "id": "194"
    }

#### Response data when success (status <font color="green">200</font>)

    {
        "message": "Appointment succesfully cancelled"
    }

#### Response data when error occurs (status <font color="red">400</font>)

    {
        "error": "Not logged in"
    }

---



## /device/get

Get user's registered devices

#### Request method

- GET


#### Response data when success (status <font color="green">200</font>)

    [
        {
            "mac": "44:38:39:ff:ef:51",
            "type": "laptop",
            "id": 11,
            "confirmed": true
        }
    ]

#### Response data when error occurs (status <font color="red">400</font>)

    {
        "error": "Not logged in"
    }

---


## /device/register

Register new device

#### Request method

- POST

#### Request data example

    {
        "mac": "44:38:39:ff:ef:50"
    }

#### Response data when success (status <font color="green">200</font>)

    {
        "mac": "44:38:39:ff:ef:50",
        "type": "Phone",
        "id": 12,
        "confirmed": false
    }

#### Response data when error occurs (status <font color="red">400</font>)

    {
        "error": "The MAC Address is already registered"
    }

---

## /device/delete

Delete registered device

#### Request method

- POST

#### Request data example

    {
        "id": "12"
    }

#### Response data when success (status <font color="green">200</font>)

    {
        "message": "Device deleted sucessfully "
    }

#### Response data when error occurs (status <font color="red">400</font>)

    {
        "error": "Device does not exist"
    }
