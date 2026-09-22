import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import webinars from '../data/webinars.json';
import RegistrationForm from '@/components/RegistrationForm';

const WebinarDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const webinar = webinars.find(w => w.id === id);
  if (!webinar) {
    return <div className=p-8
