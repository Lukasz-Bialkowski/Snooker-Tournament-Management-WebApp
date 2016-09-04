package controller;

import entity.Tournament;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import services.TournamentService;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Controller
@RequestMapping("tournaments")
public class TournamentController {

    private static final Logger logger = LoggerFactory.getLogger(TournamentController.class);

    @Autowired
    TournamentService tournamentService;

    private TournamentService getService() {
        return this.tournamentService;
    }

    @RequestMapping(method = {RequestMethod.POST},value = {"/save"})
    @ResponseBody
    public Tournament save(@RequestBody Tournament model, HttpServletResponse response) {
        return this.getService().save(model);
    }

    @RequestMapping(method = {RequestMethod.DELETE},value = {"/{id}"})
    @ResponseBody
    public void remove(@PathVariable("id") Long id) {
        this.getService().remove(id);
    }

    @RequestMapping(method = {RequestMethod.GET},value = {"/create"})
    @ResponseBody
    public Tournament create() {
        return this.getService().create();
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> list() {
        List<Tournament> tournaments = this.getService().list();
        return new ResponseEntity<List<Tournament>>(tournaments, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> get(@PathVariable Long id) {
        Tournament tournament = this.getService().get(id);
        return new ResponseEntity<Tournament>(tournament, HttpStatus.OK);
    }

    @RequestMapping(method = {RequestMethod.GET},value = {"/tournament"})
    @ResponseBody
    public ResponseEntity<?> pointsTournament(@RequestParam int year) {
        List<Tournament> tournaments = this.getService().findTournamentByYearInWhichPlayerScoredAtLeast1000(year);
        return new ResponseEntity<List<Tournament>>(tournaments, HttpStatus.OK);
    }

}
