import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

const STORAGE_KEY = 'mylist'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { 
    this.init();
  }

  init(){
    this.storage.create();
  }
  async firstLogin()
  {
    await this.addData({
      eater: {
        clickedRight: 0,
        clickedWrong: 0,
        highScore: 0,
        completed: 0
      },
      memorizer: {
        putRight: 0,
        putWrong: 0,
        timeSpent: 0,
        fullyCompleted: 0
      }
    })
    await this.addData({
        chessLessonsDone: 0
    })
    await this.addData({
      id: 0,
      actualLesson: 0,
      isActualLessonDone: false,
    })

  }

  getData()
  {
    return this.storage.get(STORAGE_KEY) || []
  }

  async addData(item)
  {
    const storedData = await this.storage.get(STORAGE_KEY) || [];
    storedData.push(item);
    return this.storage.set(STORAGE_KEY, storedData);
  }

  async updateData(item: object, index: number)
  {
    const storedData = await this.storage.get(STORAGE_KEY) || [];
    storedData[index] = item;
    return this.storage.set(STORAGE_KEY, storedData);
  }

  async removeData(index)
  {
    const storedData = await this.storage.get(STORAGE_KEY) || [];
    storedData.splice(index, 1);
    return this.storage.set(STORAGE_KEY, storedData);
  }
}
