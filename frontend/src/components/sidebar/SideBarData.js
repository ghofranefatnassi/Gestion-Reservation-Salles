import React from 'react';
import { MdDashboard } from "react-icons/md";
import { BiSolidContact } from "react-icons/bi";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
export const SidebarData = [
  {
    title: 'TABLEAU DE BORD',
    path: '/Tableau',
    icon: <MdDashboard color="#D5DEEF" />,
    cName: 'nav-text'
  },
  {
    title: 'CONTACTS',
    path: '/Contacts',
    icon: <BiSolidContact color="#D5DEEF" />,
    cName: 'nav-text'
  }, 
  {
    title: 'PROJETS',
    path: '/Projets',
    icon: <ShoppingCartIcon color="#D5DEEF" />,
    cName: 'nav-text'
  },
];