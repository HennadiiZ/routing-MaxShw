import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  server: {id: number, name: string, status: string};

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit() {

    // dynamic
    // this.route.data.subscribe(
    //   (data: Data) => {
    //     this.server = data.server;
    //   }
    // );

    //static
    const id = +this.route.snapshot.params.id;
    this.server = this.serversService.getServer(id);
    this.subscription = this.route.params
    .subscribe((params:Params) => {
      this.server = this.serversService.getServer(+params.id);
    })
  }

  onEdit(){
    // this.router.navigate(['edit'], {relativeTo: this.route })
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve' })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }



}
