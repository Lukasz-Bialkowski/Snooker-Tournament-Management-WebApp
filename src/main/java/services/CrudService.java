package services;

import java.util.List;

public interface CrudService<T> {
    List<T> list();

    T get(Long var1);

    T save( T var1);

    void remove(Long var1);

    T create();
}