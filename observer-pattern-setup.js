"use strict";

class Subject {
  constructor(state) {
    this.state = state;
    this.observers = [];
  }

  getState() {
    return this.state;
  }

  setState(state) {
    this.state = state;
    this.notifyObservers(this.state);
  }

  registerObserver(observer) {
    this.observers.push(observer);
  }

  unregisterObserver(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notifyObservers(data) {
    this.observers.forEach(observer => observer.notify(data));
  }
}

class Observer {
  constructor(subject) {
    if (subject.registerObserver != undefined) {
      subject.registerObserver(this);
    }

    this.subscribers = [];
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  unSubscribe(subscriber) {
    let subIndex = this.subscribers.indexOf(subscriber);
    this.subscribers.push(subscriber);
  }

  notify(data) {
    this.subscribers.forEach(subscriber => subscriber(data));
  }
}