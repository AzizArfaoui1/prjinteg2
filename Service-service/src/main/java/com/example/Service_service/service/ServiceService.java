package com.example.Service_service.service;


import com.example.Service_service.entity.ServiceEntity;
import com.example.Service_service.exception.ResourceNotFoundException;
import com.example.Service_service.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ServiceService {

    @Autowired
    private ServiceRepository serviceRepository;

    public List<ServiceEntity> getAllServices() {
        return serviceRepository.findAll();
    }

    public ServiceEntity getServiceById(String id) {
        return serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service introuvable avec l'ID : " + id));
    }


    public ServiceEntity createService(ServiceEntity service) {
        return serviceRepository.save(service);
    }

    public ServiceEntity updateService(String id, ServiceEntity serviceDetails) {
        ServiceEntity service = getServiceById(id);
        service.setServiceName(serviceDetails.getServiceName());
        service.setDescription(serviceDetails.getDescription());
        service.setPrice(serviceDetails.getPrice());
        service.setDuree(serviceDetails.getDuree());
        service.setDate(serviceDetails.getDate());
        service.setProviderId(serviceDetails.getProviderId());
        return serviceRepository.save(service);
    }

    public void deleteService(String id) {
        if (!serviceRepository.existsById(id)) {
            throw new ResourceNotFoundException("Service introuvable avec l'ID : " + id);
        }
        serviceRepository.deleteById(id);
    }


}