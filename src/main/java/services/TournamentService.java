package services;

import entity.Tournament;

import java.util.List;

public interface TournamentService extends CrudService<Tournament>  {
    List<Tournament> findByYear(int year);
}
