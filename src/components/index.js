import 'react-toastify/dist/ReactToastify.css';
import Nav from "./Navbar";
import PersonalCard from "./Card";
import MedicalCard from "./MedicalCard";
import DistanceDisplay from "./DistanceDisplay";
import HeartRate from "./HeartRate";
import OxygenLevel  from "./OxygenLevel";
import PatientBloodPressure from "./PatientBloodPressure";
import PatientTemperature from "./PatientTemperature"
import WeatherComponent from "./WeatherComponent";
import Slider from "./DashboardComponents/Slider"
import Dashboard from "../pages/Dashboard";
import PatientTable from "./DashboardComponents/PatientTable"
import DoctorWelcomeCard from "./DashboardComponents/DoctorWelcomeCard";
import Note from "./DashboardComponents/Note"
import AlertHistory from "./DashboardComponents/AlertHistoryHome";
import PatientList from "./Dash-pacientes/Prin-Pacientes"
import HomeDashboard from "../pages/HomeDashboard"
import PatientForm from "./DashboardComponents/PatientForm";
import NewUsers from "../pages/NewUsers"
import HistoryAlerts from '../pages/HistoryAlerts';
import ListAlertsHistory from './DashboardComponents/ListAlertsHistory';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import CameraComponent from './CameraComponent';
import NotificationCenter from "./NotificationCenter/NotificationCenter";
import UserProfile from "../pages/UserProfile";
import Spinner from "../assets/Spinner";


export{
    Nav, PersonalCard, MedicalCard, DistanceDisplay, HeartRate, OxygenLevel ,PatientBloodPressure, PatientTemperature, WeatherComponent, Slider, 
    Dashboard, PatientTable,DoctorWelcomeCard, Note, AlertHistory, PatientList, HomeDashboard, PatientForm, NewUsers, HistoryAlerts,
    ListAlertsHistory, Login, Register, CameraComponent, NotificationCenter, UserProfile, Spinner
}