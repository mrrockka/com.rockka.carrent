package com.rockka.carrent.services.impl;

import com.rockka.carrent.dao.InvoiceDao;
import com.rockka.carrent.domain.Invoice;
import com.rockka.carrent.services.InvoiceService;
import org.joda.time.LocalDateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service("invoiceService")
public class InvoiceServiceImp implements InvoiceService {
    @Autowired
    private InvoiceDao invoiceDao;
    private Logger logger = LoggerFactory.getLogger(InvoiceServiceImp.class);
    @Override
    public Invoice getById(long id) {
        if(id > 0) {
            return invoiceDao.getById(id);
        }else {
            logger.error("Id is negative");
        }
        return null;
    }

    @Override
    public List<Invoice> getAllWithUser(String username) {
        return getAllWithUser(username, false);

    }

    @Override
    public List<Invoice> getAllWithUser(String username, boolean withDeleted) {
        if(username != null && !username.equals("")){
            return invoiceDao.getAllWithUser(username, withDeleted);
        }else {
            logger.error("Username is null");
        }
        return null;
    }

    @Override
    public List<Invoice> getAllWithCar(long carId, boolean withDeleted) {
        if(carId >0){
            return invoiceDao.getAllWithCar(carId, withDeleted);
        } else {
            logger.error("car_id is negative");
        }
        return null;
    }

    @Override
    public List<Invoice> getAllWithCar(long carId) {
        return getAllWithCar(carId, false);
    }

    @Override
    public List<Invoice> getAll() {
        return invoiceDao.getAll();
    }

    @Override
    public Invoice save(Invoice invoice) {
        if(invoice != null){
            invoiceDao.save(invoice);
        }else {
            logger.error("invoice is null");
        }
        return invoice;
    }

    @Override
    public Invoice delete(Invoice invoice) {
        if(invoice != null) {
            update(invoice.setInvoiceStatus(0));
        } else {
            logger.error("invoice is null");
        }
        return invoice;
    }

    @Override
    public Invoice update(Invoice invoice){
        if(invoice != null) {
            invoiceDao.update(invoice.setModifiedAt(LocalDateTime.now()));
        }else {
            logger.error("invoice is null");
        }
        return invoice;
    }
}
