package com.weather.weatherbackend.controller;

import com.weather.weatherbackend.model.Weather;
import com.weather.weatherbackend.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/weather")
@CrossOrigin("*")
public class WeatherController {

    @Autowired
    private WeatherService service;

    @GetMapping
    public List<Weather> getAllWeather() {
        return service.getAllWeather();
    }

    @PostMapping
    public Weather saveWeather(@RequestBody Weather weather) {
        return service.saveWeather(weather);
    }
}