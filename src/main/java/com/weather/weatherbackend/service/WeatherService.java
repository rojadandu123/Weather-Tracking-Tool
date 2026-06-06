package com.weather.weatherbackend.service;

import com.weather.weatherbackend.model.Weather;
import com.weather.weatherbackend.repository.WeatherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WeatherService {

    @Autowired
    private WeatherRepository repository;

    public List<Weather> getAllWeather() {
        return repository.findAll();
    }

    public Weather saveWeather(Weather weather) {
        return repository.save(weather);
    }
}