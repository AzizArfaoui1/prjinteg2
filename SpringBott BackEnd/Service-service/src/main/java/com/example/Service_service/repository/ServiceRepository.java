package com.example.Service_service.repository;

import com.example.Service_service.entity.ServiceEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends MongoRepository<ServiceEntity, String> {
    List<ServiceEntity> findByCategoryId(String categoryId);
}