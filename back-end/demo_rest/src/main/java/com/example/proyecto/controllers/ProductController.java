package com.example.proyecto.controllers;

import java.util.List;
import java.util.Optional;

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

import com.example.proyecto.models.ProductDTO;
import com.example.proyecto.repositories.IProductDAO;

@RestController
@RequestMapping(method = RequestMethod.GET,path = "/api")
@CrossOrigin(origins="*",methods= {RequestMethod.POST,RequestMethod.GET,RequestMethod.PUT,RequestMethod.DELETE})
public class ProductController {

	@Autowired
	private IProductDAO repository;
	
	@PostMapping("/add")
	public ProductDTO create(@Validated @RequestBody ProductDTO p) {
		return repository.insert(p);
	}
	
	@GetMapping("/products")
	public List<ProductDTO> readAll(){
		return repository.findAll();
	}
	
	@PutMapping("/product/{id}")
	public ProductDTO update(@PathVariable String id,@Validated @RequestBody ProductDTO p) {
		ProductDTO model=repository.findById(id).orElse(null);
		model.setName(p.getName());
		model.setCategory(p.getCategory());
		model.setUnit_price(p.getUnit_price());
		model.setStatus(p.getStatus());
		return repository.save(model);
	}
	
	@DeleteMapping("/product/{id}")
	public void delete(@PathVariable String id) {
		repository.deleteById(id);
	}
	
}
