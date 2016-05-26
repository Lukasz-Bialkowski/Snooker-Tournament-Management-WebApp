package services;

import entity.Tournament;

import java.util.List;

public interface TournamentService extends CrudService<Tournament>  {

    List<Tournament> findTournamentByYearInWhichPlayerScoredAtLeast1000(int year);
}
