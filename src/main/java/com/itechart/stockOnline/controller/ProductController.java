package com.itechart.stockOnline.controller;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.itechart.stockOnline.exception.ValidationError;
import com.itechart.stockOnline.model.Product;
import com.itechart.stockOnline.model.enums.ProductUnit;
import com.itechart.stockOnline.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;
@RestController
@JsonInclude(JsonInclude.Include.NON_NULL)
@RequestMapping(value = "/api")
public class ProductController {
    private final static Logger LOGGER = LoggerFactory.getLogger(ProductController.class);
    @Autowired
    private ProductService productService;
    @RequestMapping(value = "/products", method = RequestMethod.GET)
    public List<Product> getProducts() {
        LOGGER.debug("REST request. Path:/products  method: GET");
        return productService.getAll();
    }

    @RequestMapping(value = "/product/{id}", method = RequestMethod.GET)
    public Product getProduct(@PathVariable Long id) {
        LOGGER.debug("REST request. Path:/product/{id}  method: GET", id);
        return productService.get(id);
    }

    @RequestMapping(value = "/product/{id}", method = RequestMethod.DELETE)
    public void deleteProduct(@PathVariable Long id, HttpServletResponse response) {
        LOGGER.debug("REST request. Path:/product/{id}  method: DELETE", id);
        productService.delete(id);
        response.addHeader("result", "Product has deleted.");
    }


    @RequestMapping(value = "/products", method = RequestMethod.DELETE)
    public void deleteProducts(@RequestParam(value = "ids") List<Long> actsId, HttpServletResponse response ) {
        LOGGER.debug("REST request. Path:/products?ids={}  method: DELETE Request body {products}", actsId);
        productService.delete(actsId.toArray(new Long[actsId.size()]));
        response.addHeader("result", "Products have deleted.");
    }

    @RequestMapping(value = "/product", method = RequestMethod.POST)
    public void saveProduct(@RequestBody Product product, HttpServletResponse response) {
        LOGGER.debug("REST request. Path:/product  method: POST Request body {product}", product);
        Product saveProduct = productService.save(product);
        response.addHeader("result", "Product has saved.");
    }

    @RequestMapping(path = "/products/units", method = RequestMethod.GET)
    public ProductUnit[] getProductUnits() {
        return ProductUnit.values();
    }

    @ExceptionHandler(ValidationError.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> fieldHasErrors(ValidationError error, HttpServletResponse response){
        LOGGER.error("fieldHasErrors({})", error.toString());
        response.addHeader("result", "Fields is not valid.");
        return error.getErrors();
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public void exception(Exception exception, HttpServletResponse response){
        LOGGER.error("fieldHasErrors({})", exception.getMessage());
        response.addHeader("result", "Server error.");
    }
}
