package services;

import entity.Player;

import java.util.List;

public interface PlayerService extends CrudService<Player>{
    List<Player> filterPlayersByTournament(Long tournamentId);
    int getMatchesForPlayer(Long id);
}
