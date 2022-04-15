import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
declare module "canvas-confetti";
import * as confetti from "canvas-confetti";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements AfterViewInit {
  title = "congrats-beans";
  @ViewChild("confetti") confettiCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild("confetti") ship!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    confetti.create(this.confettiCanvas.nativeElement, { resize: true })({
      shapes: ["square"],
      particleCount: 100,
      spread: 360,
    });
  }

  isShip = false;
  partyTime = false;
  claim(e: any) {
    this.isShip = false;
    setTimeout(() => {
      this.isShip = true;
    });
    if (!this.partyTime) {
      setTimeout(() => {
        this.audio.play();
      });
      this.partyTime = true;
    }
    this.boom(e);
  }

  audio = new Audio();
  constructor() {
    this.audio.src = "assets/all-star.mp3";
    this.audio.load();
    this.audio.loop = true;
  }

  boom(click: any) {
    const { clientX, clientY } = click;
    const { width, height } =
      this.confettiCanvas.nativeElement.getBoundingClientRect();
    confetti.create(this.confettiCanvas.nativeElement, { resize: true })({
      shapes: ["square"],
      particleCount: 100,
      spread: 360,
      origin: {
        y: clientY / height,
        x: clientX / width,
      },
    });
  }
}
