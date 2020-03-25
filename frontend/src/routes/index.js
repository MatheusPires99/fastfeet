import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";

import SignIn from "../pages/SignIn";

import { OrderList, OrderForm } from "../pages/Order";
import { DeliverymanList, DeliverymanForm } from "../pages/Deliveryman";
import { RecipientList, RecipientForm } from "../pages/Recipient";
import { ProblemList, ProblemForm } from "../pages/Problem";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/orders" component={OrderList} isPrivate />
      <Route path="/order/new" component={OrderForm} isPrivate />
      <Route path="/order/edit/:id" component={OrderForm} isPrivate />

      <Route path="/deliverymans" component={DeliverymanList} isPrivate />
      <Route path="/deliveryman/new" component={DeliverymanForm} isPrivate />
      <Route
        path="/deliveryman/edit/:id"
        component={DeliverymanForm}
        isPrivate
      />

      <Route path="/recipients" component={RecipientList} isPrivate />
      <Route path="/recipient/new" component={RecipientForm} isPrivate />
      <Route path="/recipient/edit/:id" component={RecipientForm} isPrivate />

      <Route path="/problems" component={ProblemList} isPrivate />
      <Route path="/problem/new" component={ProblemForm} isPrivate />

      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
