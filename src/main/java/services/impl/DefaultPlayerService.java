package services.impl;

import entity.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import repository.MatchRepository;
import repository.PlayerRepository;
import services.PlayerService;

import java.util.List;

@Service
public class DefaultPlayerService extends CrudServiceImpl<Player> implements PlayerService {

    @Autowired
    PlayerRepository playerRepository;

    @Autowired
    MatchRepository matchRepository;

    public JpaRepository<Player, Long> getRepository(){
        return playerRepository;
    }

    @Override
    public Player create() {
        return new Player();
    }

    @Override
    public List<Player> filterPlayersByTournament(Long tournamentId) {
        return playerRepository.filterPlayersByTournament(tournamentId);
    }

    @Override
    public int getMatchesForPlayer(Long id) {
        return matchRepository.getMatchesForPlayer(id);
    }
}
