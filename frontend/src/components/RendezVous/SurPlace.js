import * as React from 'react';
import { Button } from 'react-bootstrap';
import Button2 from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Form } from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import './RendezVous.css'

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

const SurPlace = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const [open2, setOpen2] = React.useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
  
    const [open1, setOpen1] = React.useState(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);
    const [open3, setOpen3] = React.useState(false);
    const handleOpen3 = () => setOpen3(true);
    const handleClose3 = () => setOpen3(false);
  
  return (
    <div className='RMain'>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
    <Button variant="primary" style={{borderRadius: "20px"}}  onClick={handleOpen3}>Nouveau rendez-vous</Button>

    <Modal
    open={open3}
    onClose={handleClose3}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style1}>
      <Typography id="modal-modal-title" variant="h6" component="h2" sx={{color:'#0083CB'}}>
       Ajouter un rendez-vous
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 0.5 ,color:'#707980' }}>
        Créer un rendez-vous.
      </Typography>
      <Row className="mb-3">
      <Form.Group as={Col} md="6">
        <Form.Label>Nom</Form.Label>
        <Form.Control
          type="text"
        />
      </Form.Group>
      <Form.Group as={Col} md="6">
        <Form.Label>Prénom</Form.Label>
        <Form.Control
        type="text"
      />
      </Form.Group>
    </Row>
    <Row className="mb-3">
       <Form.Group as={Col} md="6">
         <Form.Label>Date</Form.Label>
         <LocalizationProvider dateAdapter={AdapterDayjs}>
     <DemoContainer
       components={[
         'DatePicker',
       ]}
     >
     <DemoItem>
     <DatePicker className='date' />
   </DemoItem>
   </DemoContainer>
   </LocalizationProvider>
       </Form.Group>
       <Form.Group as={Col} md="6">
         <Form.Label>Temps</Form.Label>
         <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DemoContainer
           components={[
             'MobileTimePicker',
           ]}
         >
         <DemoItem className='date'>
         <MobileTimePicker defaultValue={dayjs('2022-04-17T15:30')} />
       </DemoItem>
       </DemoContainer>
       </LocalizationProvider>
       </Form.Group>
     </Row>
     <Form.Group as={Col} md="6">
     <Form.Label>Situation</Form.Label>
     <Form.Select >
     <option>Pas encore</option>
     <option>Terminé</option>
   </Form.Select>
     </Form.Group>
     <Form.Group className="mt-2 d-flex justify-content-end">
     <Button variant="primary">Sauvgarder</Button>
   </Form.Group>
      </Box>
  </Modal>

    <div style={{display: 'flex', alignItems: 'center'}}>
      <div style={{backgroundColor: "#fff", width: "300px", height: '30px', display: 'flex', alignItems: "center", color: '#7C858C', borderRadius: '20px', padding: '8px', marginRight: '10px'}}>
        <SearchIcon />
        <input type='text' style={{backgroundColor: "#fff", height: '30px', border: 'none', outline: 'none'}} placeholder='Recherche'/>
      </div>
      <div style={{position: "relative"}}>
        <Button2  
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick} 
          style={{color: "#7C858C"}}
        >
          <FilterListIcon style={{color: "#7C858C"}}/>
          Filter
        </Button2>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>Filter1</MenuItem>
          <MenuItem onClick={handleClose}>Filter2</MenuItem>
          <MenuItem onClick={handleClose}>Filter3</MenuItem>
        </Menu>
      </div>
    </div>
  </div>
   <TableContainer component={Paper} style={{marginTop:"20px",padding:'10px'}}>
  <Table sx={{ minWidth: 650}} size="small" aria-label="a dense table">
    <TableHead>
      <TableRow>
        <TableCell align="right" style={{color:"#7C858C"}}>Nom <UnfoldMoreIcon fontSize="small"/></TableCell>
        <TableCell align="right" style={{color:"#7C858C"}}>Prénom <UnfoldMoreIcon fontSize="small"/></TableCell>
        <TableCell align="right" style={{color:"#7C858C"}}>Date <UnfoldMoreIcon fontSize="small"/></TableCell>
        <TableCell align="right" style={{color:"#7C858C"}}>Temps<UnfoldMoreIcon fontSize="small"/></TableCell>
        <TableCell align="right" style={{color:"#7C858C"}}>Situation<UnfoldMoreIcon fontSize="small"/></TableCell>
        <TableCell align="right" style={{color:"#7C858C"}}>M/A<UnfoldMoreIcon fontSize="small"/></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
        <TableRow>
          <TableCell align="right"></TableCell>
          <TableCell align="right"></TableCell>
          <TableCell align="right"></TableCell>
          <TableCell align="right"></TableCell>
          <TableCell align="right"></TableCell>
          <TableCell align="right">
           <button className='Modifier' onClick={handleOpen1}>Modifier</button>

           <Modal
           open={open1}
           onClose={handleClose1}
           aria-labelledby="modal-modal-title"
           aria-describedby="modal-modal-description"
         >
           <Box sx={style1}>
             <Typography id="modal-modal-title" variant="h6" component="h2" sx={{color:'#42B72A'}}>
              Modifier
             </Typography>
             <Typography id="modal-modal-description" sx={{ mt: 0.5 ,color:'#707980' }}>
               Mettre à jour ce rendez-vous
             </Typography>
             <Row className="mb-3">
             <Form.Group as={Col} md="6">
               <Form.Label>Nom</Form.Label>
               <Form.Control
                 type="text"
               />
             </Form.Group>
             <Form.Group as={Col} md="6">
               <Form.Label>Prénom</Form.Label>
               <Form.Control
               type="text"
             />
             </Form.Group>
           </Row>
           <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>Date</Form.Label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={[
                'DatePicker',
              ]}
            >
            <DemoItem>
            <DatePicker className='date' />
          </DemoItem>
          </DemoContainer>
          </LocalizationProvider>
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Temps</Form.Label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={[
                    'MobileTimePicker',
                  ]}
                >
                <DemoItem className='date'>
                <MobileTimePicker defaultValue={dayjs('2022-04-17T15:30')} />
              </DemoItem>
              </DemoContainer>
              </LocalizationProvider>
              </Form.Group>
            </Row>
            <Form.Group as={Col} md="6">
            <Form.Label>Situation</Form.Label>
            <Form.Select >
            <option>Pas encore</option>
            <option>Terminé</option>
          </Form.Select>
            </Form.Group>
            <Form.Group className="mt-2 d-flex justify-content-end">
            <Button className='Modifier'>Sauvgarder</Button>
          </Form.Group>
             </Box>
         </Modal>

          <p><button className='Annuler' onClick={handleOpen2}>Annuler</button></p>

          <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Êtes-vous sûr de vouloir annuler ce rendez-vous ?
            </Typography>
            <Typography style={{alignItems:"center",justifyContent:'center'}}>
            <button style={{color:"#7C858C",alignItems:"center",justifyContent:'center',marginLeft:'20px'}} onClick={handleClose2}>NON</button>
            <button style={{color:"#fff" , backgroundColor:"#FF0000",borderRadius:'10px',padding:"8px",width:"119px",height:"40px",marginLeft:'20px'}}>OUI</button>
            </Typography>
         
          </Box>
        </Modal>

          </TableCell>
        </TableRow>
    </TableBody>
  </Table>
</TableContainer>
</div>
  )
}

export default SurPlace
