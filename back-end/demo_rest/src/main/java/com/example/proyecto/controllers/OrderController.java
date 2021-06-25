package com.example.proyecto.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.proyecto.models.OrderDTO;
import com.example.proyecto.repositories.IOrderDAO;

@RestController
@RequestMapping(method = RequestMethod.GET,path = "/api/orders")
@CrossOrigin(origins="*",methods= {RequestMethod.POST,RequestMethod.GET,RequestMethod.PUT,RequestMethod.DELETE})
public class OrderController {

	@Autowired
	private IOrderDAO repository;
	
	@PostMapping("/add")
	public OrderDTO create(@Validated @RequestBody OrderDTO p) {
		return repository.insert(p);
	}
	
	@GetMapping("/list")
	public List<OrderDTO> readAll(){
		return repository.findAll();
	}
	
	
	@DeleteMapping("/order/{id}")
	public void delete(@PathVariable String id) {
		repository.deleteById(id);
	}
	
}
