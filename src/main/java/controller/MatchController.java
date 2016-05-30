package controller;

import entity.Match;
import entity.Player;
import entity.Tournament;
import entity.dto.MatchDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import services.MatchService;
import services.PlayerService;
import services.TournamentService;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Controller
@RequestMapping("tournaments/{tournamentId}/matches")
public class MatchController {
    private static final Logger logger = LoggerFactory.getLogger(TournamentController.class);

    @Autowired
    MatchService matchService;

    @Autowired
    PlayerService playerService;

    @Autowired
    TournamentService tournamentService;

    private MatchService getService() {
        return this.matchService;
    }

    @RequestMapping(method = {RequestMethod.POST},value = {"/savedto"})
    @ResponseBody
    public Match save(@RequestBody MatchDTO model, @PathVariable long tournamentId, HttpServletResponse response) {

        Player firstPlayer = playerService.get(model.getFirstPlayerId());
        Player secondPlayer = playerService.get(model.getSecondPlayerId());
        Tournament tournament = tournamentService.get(tournamentId);

        Match match = new Match();
        if(model.getMatchId()!=null){match.setId(model.getMatchId());}
        match.setFirstPlayer(firstPlayer);
        match.setSecondPlayer(secondPlayer);
        match.setTournament(tournament);

        System.out.println(match);

        return this.getService().save(match);
    }

    @RequestMapping(method = {RequestMethod.POST},value = {"/save"})
    @ResponseBody
    public Match save(@RequestBody Match model, @PathVariable long tournamentId, HttpServletResponse response) {

        Tournament tournament = tournamentService.get(tournamentId);
        Match match = model;
        match.setTournament(tournament);
        System.out.println(match);

        return this.getService().save(match);
    }

    @RequestMapping(method = {RequestMethod.GET},value = {"/dto"})
    @ResponseBody
    public MatchDTO getDTO(HttpServletResponse response) {
        return new MatchDTO();
    }

    @RequestMapping(method = {RequestMethod.DELETE},value = {"/{id}"})
    @ResponseBody
    public void remove(@PathVariable("id") Long id,@PathVariable int tournamentId) {
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
    public ResponseEntity<?> get(@PathVariable Long id,@PathVariable int tournamentId) {
        Match match = this.getService().get(id);
        return new ResponseEntity<Match>(match, HttpStatus.OK);
    }
}
