package controller;

import entity.Match;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import services.MatchService;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Controller
@RequestMapping("matches")
public class MatchController {
    private static final Logger logger = LoggerFactory.getLogger(TournamentController.class);

    @Autowired
    MatchService matchService;

    private MatchService getService() {
        return this.matchService;
    }

    @RequestMapping(method = {RequestMethod.POST},value = {"/save"})
    @ResponseBody
    public Match save(@RequestBody Match model, HttpServletResponse response) {
        return this.getService().save(model);
    }

    @RequestMapping(method = {RequestMethod.DELETE},value = {"/{id}"})
    @ResponseBody
    public void remove(@PathVariable("id") Long id) {
        this.getService().remove(id);
    }

    @RequestMapping(method = {RequestMethod.GET},value = {"/create"})
    @ResponseBody
    public Match create() {
        return this.getService().create();
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> list() {
        List<Match> matches = this.getService().list();
        return new ResponseEntity<List<Match>>(matches, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> get(@PathVariable Long id) {
        Match match = this.getService().get(id);
        return new ResponseEntity<Match>(match, HttpStatus.OK);
    }
}
