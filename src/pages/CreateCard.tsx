import { CreateCardForm } from '../components/cards/CreateCardForm';

export function CreateCard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create Digital Business Card</h1>
        <p className="mt-2 text-gray-600">
          Fill in your information below to create your digital business card. Preview your card in
          real-time as you type.
        </p>
      </div>
      <CreateCardForm />
    </div>
  );
}