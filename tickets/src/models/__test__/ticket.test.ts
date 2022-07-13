import { Ticket } from "../Ticket";

it("Implements occ", async () => {
  const ticket = Ticket.buildTicket({
    title: "Mohamed",
    price: 1.2,
    userId: "3123123",
  });
  await ticket.save();
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);
  firstInstance?.set({
    price: 10,
  });
  secondInstance?.set({
    price: 15,
  });
  await firstInstance?.save();
  try {
    await secondInstance?.save();
  } catch (error) {
    return;
  }
});
