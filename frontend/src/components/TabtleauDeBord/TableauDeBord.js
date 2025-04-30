import * as React from 'react';
import './TableauDeBord.css'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import { IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Form } from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
const style1 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 841,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  
};

const TableauDeBord = () => {
  return (
  <div className='container-main'></div>
    
  )
}

export default TableauDeBord
