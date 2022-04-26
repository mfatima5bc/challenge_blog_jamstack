import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

function DateFormat(date: string): string {
  return format(new Date(date), 'dd LLL yyyy', {
    locale: ptBR,
  });
}

export default DateFormat;
