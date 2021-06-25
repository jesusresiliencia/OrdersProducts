package com.example.proyecto.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.example.proyecto.models.OrderDTO;

@Repository
public interface IOrderDAO extends MongoRepository<OrderDTO, String> {

}
