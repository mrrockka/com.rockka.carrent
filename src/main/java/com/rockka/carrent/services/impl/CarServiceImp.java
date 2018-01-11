package com.rockka.carrent.services.impl;

import com.rockka.carrent.dao.CarDao;
import com.rockka.carrent.domain.Car;
import com.rockka.carrent.services.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("carService")
public class CarServiceImp implements CarService{
    @Autowired
    private CarDao carDao;
    @Override
    public List<Car> getAll() {
        return carDao.getAll();
    }

    @Override
    public Car getById(long id) {
        return carDao.getById(id);
    }

    @Override
    public Car save(Car car) {
        return carDao.save(car);
    }

    @Override
    public Car delete(Car car) {
        return carDao.delete(car);
    }
}