package controller;

import com.fasterxml.jackson.annotation.JsonView;
import entity.Player;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import services.PlayerService;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Controller
@RequestMapping("players")
public class PlayerController {

    private static final Logger logger = LoggerFactory.getLogger(PlayerController.class);

    @Autowired
    PlayerService playerService;

    private PlayerService getService() {
        return this.playerService;
    }

    @RequestMapping(method = {RequestMethod.POST},value = {"/save"})
    @ResponseBody
    public Player save(@RequestBody Player model, HttpServletResponse response) {
        return this.getService().save(model);
    }

    @RequestMapping(method = {RequestMethod.DELETE},value = {"/{id}"})
    @ResponseBody
    public void remove(@PathVariable("id") Long id) {
        this.getService().remove(id);
    }

    @RequestMapping(method = {RequestMethod.GET},value = {"/create"})
    @ResponseBody
    public Player create() {
        return this.getService().create();
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> list() {
        List<Player> players = playerService.list();
        return new ResponseEntity<List<Player>>(players, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> get(@PathVariable Long id) {
        Player player = playerService.get(id);
        System.out.println(player);
        return new ResponseEntity<Player>(player, HttpStatus.OK);
    }

}
