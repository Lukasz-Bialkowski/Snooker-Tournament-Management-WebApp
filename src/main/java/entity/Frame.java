package entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class Frame {

    @Id
    @GeneratedValue
    Long id;

    @ManyToOne
    Match match;

    int firstPlayerScore;
    int secondPlayerScore;

    public int getFirstPlayerScore() {
        return firstPlayerScore;
    }

    public void setFirstPlayerScore(int firstPlayerScore) {
        this.firstPlayerScore = firstPlayerScore;
    }

    public int getSecondPlayerScore() {
        return secondPlayerScore;
    }

    public void setSecondPlayerScore(int secondPlayerScore) {
        this.secondPlayerScore = secondPlayerScore;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Match getMatch() {
        return match;
    }

    public void setMatch(Match match) {
        this.match = match;
    }

    @Override
    public String toString() {
        return "Frame{" +
                "id=" + id +
                ", match=" + match +
                ", firstPlayerScore=" + firstPlayerScore +
                ", secondPlayerScore=" + secondPlayerScore +
                '}';
    }

    @JsonIgnore
    public Player getWinner(){
        return firstPlayerScore>secondPlayerScore?this.match.getFirstPlayer():this.match.getSecondPlayer();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Frame frame = (Frame) o;

        if (firstPlayerScore != frame.firstPlayerScore) return false;
        if (secondPlayerScore != frame.secondPlayerScore) return false;
        if (id != null ? !id.equals(frame.id) : frame.id != null) return false;
        return !(match != null ? !match.equals(frame.match) : frame.match != null);

    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (match != null ? match.hashCode() : 0);
        result = 31 * result + firstPlayerScore;
        result = 31 * result + secondPlayerScore;
        return result;
    }
}
